import { Role } from "./enums";

export interface IChildren {
  children: React.ReactNode;
}

export interface User {
  id: string;
  email: string;
  userName: string;
  roleId: string;
  status: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
}

export interface IDecoded {
  id: string;
  exp: Date;
  iat: any;
  role: Role;
}
