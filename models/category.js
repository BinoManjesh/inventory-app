import { Schema, model } from "mongoose";
import getHoursSince from "../utils/getHoursSince.js";

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

CategorySchema.virtual("hoursSinceCreate").get(function () {
  return getHoursSince(this.createdAt);
});

export default model("Category", CategorySchema);
