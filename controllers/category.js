import { Category } from "../models/index.js";

export async function create_get() {}
export async function create_post() {}

export async function list(req, res) {
  const categories = await Category.find({}).sort({ name: 1 }).exec();
  res.render("category_list", { categories });
}

export async function detail() {}
export async function update_get() {}
export async function update_post() {}
export async function delete_get() {}
export async function delete_post() {}
