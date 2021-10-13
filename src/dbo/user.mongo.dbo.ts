import { UserDboTemplate, User, updateUser } from "../dto/user.dto";
import UserModel from "../models/user.model";

export class UserMongoDbo implements UserDboTemplate {
  async addUser(data: User): Promise<User> {
    return new UserModel(data).save();
  }

  async getUserByLogin(login: string): Promise<User | null> {
    return UserModel.findOne({ login });
  }

  async getUserById(_id: string): Promise<User | null> {
    return UserModel.findById(_id);
  }

  async updateUser(_id: string, data: updateUser): Promise<User> {
    await UserModel.updateOne({ _id }, data);
    // @ts-ignore
    return this.getUserById(_id);
  }
}
