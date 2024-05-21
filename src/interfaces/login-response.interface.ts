import { Usuario } from './usuario.interface';

export interface LoginResponse {
  usuario:      Usuario;
  accessToken:  string;
  refreshToken: string;
}
