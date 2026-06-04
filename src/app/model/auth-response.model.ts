export interface AuthResponse {
  token: string;
  role: UserRole;
  username: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
