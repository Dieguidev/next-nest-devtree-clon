export class User {
  id: string;
  email: string;
  name: string;
  password?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
