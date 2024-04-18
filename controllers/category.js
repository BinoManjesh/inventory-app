import { Category, Item } from "../models/index.js";

export async function create_get() {}
export async function create_post() {}

export async function list(req, res) {
  const categories = await Category.find({}).sort({ name: 1 }).exec();
  res.render("category_list", { categories });
}

export async function detail(req, res) {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  res.render("category_detail", { category, items });
}
export async function update_get() {}
export async function update_post() {}
export async function delete_get() {}
export async function delete_post() {}
