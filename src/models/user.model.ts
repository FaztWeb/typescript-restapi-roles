import bcrypt from "bcryptjs";
import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Role } from "./role.model";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
export class User {
  @prop({ type: String, unique: true })
  username: string;

  @prop({ type: String, unique: true })
  email: string;

  @prop({ type: String, required: true })
  password: string;

  @prop({ ref: () => Role })
  roles: Ref<Role>[];

  public static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export const UserModel = getModelForClass(User);
