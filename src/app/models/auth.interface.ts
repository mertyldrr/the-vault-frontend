import { User } from './user.interface';

export type CreateUserDto = Omit<User, 'id' | 'refreshToken'>;

export interface AuthenticatedUser extends User {
  accessToken: string | null;
}

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthRequestDto = {
  email: string;
  password: string;
};
