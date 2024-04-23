import { Item, Category } from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { body, validationResult } from "express-validator";
import { toHeadingCase } from "../utils/sanitizers.js";

export const create_get = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();
  res.render("item_create", { categories });
});

export const create_post = [
  body("name", "Name field is required")
    .trim()
    .notEmpty()
    .bail()
    .customSanitizer(toHeadingCase)
    .custom(async (value) => {
      const exists = await Item.exists({ name: value }).exec();
      if (exists) {
        throw new Error("Item already exists");
      }
    }),
  body("description").optional().trim(),
  body("category", "Category is required")
    .notEmpty()
    .custom(async (value) => {
      const exists = await Category.exists({ _id: value }).exec();
      if (!exists) {
        throw new Error("Category does not exist");
      }
    }),
  body("price", "Price must be a positive number").isInt({ min: 0 }),
  body("number_in_stock", "Number in stock must be a positive number").isInt({
    min: 0,
  }),

  asyncHandler(async (req, res) => {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });
    const results = validationResult(req);
    if (!results.isEmpty()) {
      const categories = await Category.find().exec();
      res.render("item_create", { categories, item, errors: results.array() });
      return;
    }
    await item.save();
    res.redirect(item.url);
  }),
];

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
