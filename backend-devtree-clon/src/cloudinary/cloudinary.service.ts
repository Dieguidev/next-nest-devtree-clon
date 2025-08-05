import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { envs } from 'src/config/envs';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config(envs.cloudinaryUrl);
  }

  async uploadSingleImage(
    fileBuffer: Buffer,
    fileMimeType: string,
    folder: string = 'default',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      const base64Image = fileBuffer.toString('base64'); // Convertir el buffer a base64
      const result = await cloudinary.uploader.upload(
        `data:${fileMimeType};base64,${base64Image}`,
        { folder },
      );

      return result; // Retornar la respuesta de Cloudinary
    } catch (error) {
      console.error('CloudinaryService - Upload error:', error);
      throw new Error(`Error uploading image: ${error.message}`);
    }
  }

  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result; // Retornar la respuesta de eliminación
    } catch (error) {
      throw new Error(`Error deleting image: ${error.message}`);
    }
  }
}
