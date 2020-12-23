export interface LoginResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  userName: string;
}
