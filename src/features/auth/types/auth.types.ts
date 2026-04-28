export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'owner' | 'staff' | 'user';
  avatarUrl?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
