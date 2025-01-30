export interface IAdmin {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  companyName: string | null;
  companyLogo: string | null;
}
