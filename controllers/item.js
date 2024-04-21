import { Item } from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";

export async function create_get() {}
export async function create_post() {}

export const list = asyncHandler(async function (req, res) {
  const items = await Item.find({}).sort({ category: 1 }).exec();
  res.render("item_list", { items });
});

export const detail = asyncHandler(async function (req, res) {
  const item = await Item.findById(req.params.id).populate("category");
  res.render("item_detail", { item });
});
export async function update_get() {}
export async function update_post() {}
export async function delete_get() {}
export async function delete_post() {}
