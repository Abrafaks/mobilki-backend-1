import { Document, Schema, model } from "mongoose";
import { User } from "../dto/user.dto";

export interface UserDocument extends User, Document {}

const userSchema = new Schema<User>({
  login: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  note: {
    enc: { type: String },
    iv: { type: Buffer },
    authTag: { type: Buffer },
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.passwordHash;
  delete userObject.__v;

  return userObject;
};

export default model<UserDocument>("user", userSchema);
