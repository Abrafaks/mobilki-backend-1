import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userDbo from "../dbo/user.dbo";
import { UserDboTemplate, User } from "../dto/user.dto";
import { UserDocument } from "../models/user.model";

export class AuthService {
  constructor(private userDbo: UserDboTemplate) {}

  async preHashPassword(password: string): Promise<string> {
    const hash = crypto.createHash("sha512");
    const pepper = process.env.USER_PASSWORD_PEPPER;
    const passwordWithPepper = `${pepper}${password}`;
    return hash.update(passwordWithPepper, "utf-8").digest("base64");
  }

  async hashPassword(password: string): Promise<string> {
    const preHashedPassword = await this.preHashPassword(password);
    return bcrypt.hash(preHashedPassword, 10);
  }

  async arePasswordsMatching(inputPassword: string, userPassword: string) {
    const preHashedPassword = await this.preHashPassword(inputPassword);
    return await bcrypt.compare(preHashedPassword, userPassword);
  }

  async getToken(user: UserDocument): Promise<string> {
    return jwt.sign(user.toJSON(), process.env.JWT!);
  }
}

export default new AuthService(userDbo);
