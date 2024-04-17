import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: "String", required: true },
    description: { type: "String" },
  },
  { timestamps: true }
);

CategorySchema.virtual("url").get(function () {
  return `/categories/${this._id}`;
});

export default model("Category", CategorySchema);
