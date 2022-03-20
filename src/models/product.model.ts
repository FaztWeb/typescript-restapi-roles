import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
class Product {
  @prop({ type: String })
  name: string;

  @prop({ type: String })
  category: string;

  @prop({ type: Number })
  price: number;

  @prop({ type: String })
  imgURL: string;
}

export const ProductModel = getModelForClass(Product);
