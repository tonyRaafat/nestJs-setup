export class CreateUserDto {
  name: string;

  age: number;

  hobbies: string[];

  role: Role;
}

export enum Role {
  admin = 'Admin',
  user = 'User',
}
