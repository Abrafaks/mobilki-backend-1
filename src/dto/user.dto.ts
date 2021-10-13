export interface User {
  login: string;
  passwordHash: string;
}

export interface addUser {
  login: string;
  password: string;
}

export interface updateUser {
  login?: string;
  password?: string;
}

export interface updateUserData {
  login?: string;
  passwordHash?: string;
}

export interface UserDboTemplate {
  getUserByLogin(login: string): Promise<User | null>;
  getUserById(_id: string): Promise<User | null>;
  addUser(data: User): Promise<User>;
  updateUser(_id: string, data: updateUser): Promise<User>;
}
