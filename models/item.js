import { Schema, model } from "mongoose";

const ItemSchema = new Schema(
  {
    name: { type: "String", required: true },
    description: { type: "String" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: "Number", required: true },
    number_in_stock: { type: "Number", required: true },
  },
  { timestamps: true }
);

ItemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

export default model("Item", ItemSchema);
