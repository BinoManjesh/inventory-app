import { Item } from "../models/index.js";

export async function create_get() {}
export async function create_post() {}

export async function list(req, res) {
  const items = await Item.find({}).sort({ category: 1 }).exec();
  res.render("item_list", { items });
}

export async function detail() {}
export async function update_get() {}
export async function update_post() {}
export async function delete_get() {}
export async function delete_post() {}
