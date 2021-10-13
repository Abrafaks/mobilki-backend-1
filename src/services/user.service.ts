import * as crypto from "crypto";
import userDbo from "../dbo/user.dbo";
import {
  UserDboTemplate,
  User,
  addUser,
  updateUser,
  updateUserData,
} from "../dto/user.dto";
import authSerivce, { AuthService } from "./auth.service";

export class UserService {
  constructor(
    private userDbo: UserDboTemplate,
    private authService: AuthService
  ) {}

  getUserByLogin(login: string): Promise<User | null> {
    return this.userDbo.getUserByLogin(login);
  }

  async addUser({ login, password }: addUser): Promise<User> {
    const passwordHash = await this.authService.hashPassword(password);

    return this.userDbo.addUser({ login, passwordHash });
  }

  async updateUser(_id: string, data: updateUser): Promise<User> {
    const updateData: updateUserData = {};

    if (data?.password) {
      updateData.passwordHash = await this.authService.hashPassword(
        data.password
      );
    }

    delete data.password;

    Object.assign(updateData, data);

    console.log(updateData);

    return this.userDbo.updateUser(_id, updateData);
  }
}

export default new UserService(userDbo, authSerivce);
