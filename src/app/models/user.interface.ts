export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string;
  password: string;
  birthDate: Date | null;
  gender: Gender | null;
  refreshToken: string | null;
}

export enum Gender {
  M = 'male',
  F = 'female',
  U = 'unspecified',
}
