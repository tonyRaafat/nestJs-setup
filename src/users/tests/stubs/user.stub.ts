import { User } from 'src/users/entities/user.entity';

export const normalUserStub = (): User => {
  return {
    name: 'jhon doe',
    age: 11,
    hobbies: ['padel', 'coding'],
    role: 'user',
  };
};

export const multiUsers = (): User[] => {
  return [
    {
      name: 'jhon doe',
      age: 11,
      hobbies: ['padel', 'coding'],
      role: 'user',
    },
    {
      name: 'jhon doe 2',
      age: 11,
      hobbies: ['padel', 'coding'],
      role: 'user',
    },
  ];
};
