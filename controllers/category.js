import { Category, Item } from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { body, validationResult } from "express-validator";
import { toHeadingCase } from "../utils/sanitizers.js";

export function create_get(req, res) {
  res.render("category_create");
}

export const create_post = [
  body("name", "Name field is required")
    .trim()
    .notEmpty()
    .bail()
    .customSanitizer(toHeadingCase)
    .custom(async (value) => {
      const exists = await Category.exists({ name: value }).exec();
      if (exists) {
        throw new Error("Category already exists");
      }
    }),
  body("description").optional().trim(),
  asyncHandler(async function (req, res) {
    const results = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    if (!results.isEmpty()) {
      res.render("category_create", { errors: results.array(), category });
      return;
    }
    await category.save();
    res.redirect(category.url);
  }),
];

export const list = asyncHandler(async function (req, res) {
  const categories = await Category.find({}).sort({ name: 1 }).exec();
  res.render("category_list", { categories });
});

export const detail = asyncHandler(async function (req, res) {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  res.render("category_detail", { category, items });
});

export async function update_get() {}
export async function update_post() {}
export async function delete_get() {}
export async function delete_post() {}
