import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadUserImageUseCase {
  private readonly logger = new Logger(UploadUserImageUseCase.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(
    userId: string,
    fileBuffer: Buffer,
    fileMimeType: string,
  ): Promise<any> {
    try {
      // Verificar que el usuario existe
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new BadRequestException('User not found');
      }

      // Validar que sea una imagen
      if (!fileMimeType.startsWith('image/')) {
        throw new BadRequestException('File must be an image');
      }

      // Validar tamaño del archivo (5MB máximo)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (fileBuffer.length > maxSize) {
        throw new BadRequestException('File size must be less than 5MB');
      }

      // Si el usuario ya tiene una imagen, eliminarla de Cloudinary
      if (existingUser.image) {
        try {
          const publicId = this.extractPublicIdFromUrl(existingUser.image);
          if (publicId) {
            await this.cloudinaryService.deleteImage(publicId);
          }
        } catch (error) {
          this.logger.warn(`Failed to delete previous image: ${error.message}`);
        }
      }

      // Subir la nueva imagen a Cloudinary
      const uploadResult = await this.cloudinaryService.uploadSingleImage(
        fileBuffer,
        fileMimeType,
        '/devtree-clone/users',
      );

      if (!uploadResult.secure_url) {
        throw new BadRequestException('Failed to upload image');
      }

      // Actualizar el usuario con la nueva URL de imagen
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          image: uploadResult.secure_url,
        },
      });

      const { password: _password, ...userWithoutPassword } = updatedUser;
      void _password;

      return {
        user: userWithoutPassword,
        message: 'Profile image uploaded successfully',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Error uploading image for user ${userId}: ${error.message}`,
      );
      throw new BadRequestException('Failed to upload image');
    }
  }

  private extractPublicIdFromUrl(imageUrl: string): string | null {
    try {
      const parts = imageUrl.split('/');
      const uploadIndex = parts.findIndex((part) => part === 'upload');

      if (uploadIndex !== -1 && uploadIndex + 2 < parts.length) {
        // Obtener todo después de /upload/v{version}/
        const pathWithExtension = parts.slice(uploadIndex + 2).join('/');
        // Remover extensión del archivo para obtener el public_id completo
        const publicId = pathWithExtension.replace(/\.[^/.]+$/, '');

        this.logger.debug(
          `Extracted public_id: ${publicId} from URL: ${imageUrl}`,
        );
        return publicId; // Esto incluirá devtree-clone/users/image_id
      }
      return null;
    } catch {
      this.logger.warn(`Failed to extract public_id from URL: ${imageUrl}`);
      return null;
    }
  }
}
