export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  birthDate?: Date;
  gender?: Gender;
}

enum Gender {
  M = 'male',
  F = 'female',
  U = 'unspecified',
}
