import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

export const ROLES = ["user", "admin", "moderator"];

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class Role {
  // @prop()
  // public _id: string;

  @prop({ type: String })
  name: string;
}

export const RolModel = getModelForClass(Role);
