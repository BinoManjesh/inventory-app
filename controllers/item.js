import { Item, Category } from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { body, validationResult } from "express-validator";
import { toHeadingCase } from "../utils/sanitizers.js";

export const create_get = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();
  res.render("item_form", { title: "Create Item", categories });
});

function getFormValidator() {
  return [
    body("name", "Name field is required")
      .trim()
      .notEmpty()
      .bail()
      .customSanitizer(toHeadingCase),
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
  ];
}

export const create_post = [
  ...getFormValidator(),
  body("name").custom(async (value) => {
    const exists = await Item.exists({ name: value }).exec();
    if (exists) {
      throw new Error("Item already exists");
    }
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
      res.render("item_form", {
        title: "Create Item",
        item,
        categories,
        errors: results.array(),
      });
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

export const update_get = asyncHandler(async (req, res) => {
  const [item, categories] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find().exec(),
  ]);
  res.render("item_form", {
    title: `Update Item ${item.name}`,
    item,
    categories,
  });
});

export const update_post = [
  ...getFormValidator(),
  body("password", "Wrong password").custom((value) => {
    console.log(`${value} <> ${process.env.SECRET_PASSWORD}`);
    return value === process.env.SECRET_PASSWORD;
  }),

  asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    item.set({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });
    const results = validationResult(req);
    if (!results.isEmpty()) {
      const categories = await Category.find().exec();
      res.render("item_form", {
        title: `Update Item ${item.name}`,
        item,
        categories,
        errors: results.array(),
      });
      return;
    }
    await item.save();
    res.redirect(item.url);
  }),
];

export const delete_get = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("category");
  res.render("item_delete", { item });
});

export const delete_post = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();
  if (
    item.hoursSinceCreate <= 12 ||
    req.body.password === process.env.SECRET_PASSWORD
  ) {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/items");
  } else {
    res.render("item_delete", { item, error: true });
  }
});
