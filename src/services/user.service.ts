import * as crypto from "crypto";
import userDbo from "../dbo/user.dbo";
import {
  UserDboTemplate,
  User,
  addUser,
  updateUser,
  updateUserData,
} from "../dto/user.dto";
import authService, { AuthService } from "./auth.service";
import cryptoService, { CryptoService } from "./crypto.service";

export class UserService {
  constructor(
    private userDbo: UserDboTemplate,
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {}

  async getUserByLogin(login: string): Promise<User | null> {
    const user = await this.userDbo.getUserByLogin(login);
    if (!user) {
      return null;
    }
    let note;
    if (user.note) {
      const { enc, iv, authTag } = user.note;
      note = this.cryptoService.decrypt(enc, iv, authTag);
    }

    delete user.note;

    return Object.assign(user, note);
  }

  getUserById(id: string): Promise<User | null> {
    return this.userDbo.getUserById(id);
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

    console.log(updateData);

    let note;

    if (data.note) {
      note = cryptoService.encrypt(data.note);
      delete data.note;
    }

    Object.assign(updateData, data, note);

    console.log(updateData);

    return this.userDbo.updateUser(_id, updateData);
  }
}

export default new UserService(userDbo, authService, cryptoService);
