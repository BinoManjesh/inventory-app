import mongoose from "mongoose";
import { Category, Item } from "../models/index.js";

main().catch((err) => console.log(err));

const categories = {};

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected");
  await createCategories();
  await createItems();
  console.log("Created everything");
  await mongoose.disconnect();
  console.log("Done!");
}

async function createCategories() {
  await Promise.all([
    createCategory("Electronics"),
    createCategory("Stationary", "Stuff like notebooks, pens, paper, ...etc."),
    createCategory("Footwear"),
  ]);
}

async function createItems() {
  await Promise.all([
    createItem(
      "Asus Laptop",
      "16GB ram AMD Ryzen something processor",
      categories["Electronics"],
      60000.5,
      1
    ),
    createItem(
      "Samsumg M12 Smart Phone",
      "Has 4 cameras",
      categories["Electronics"],
      15000,
      1
    ),
    createItem(
      "Youva Stellar Long Book",
      "A4 Size with 324 pages, single line. Suitable to be used by a college student for 4 years",
      categories["Stationary"],
      155,
      1
    ),
    createItem(
      "Parker ball point pen",
      "Nice black color pen. Can be won as a prize for doing something cool.",
      categories["Stationary"],
      100,
      1
    ),
    createItem(
      "Running Shoes",
      "Very good running shoes. Can be used to run for 16km in 1hr and 40mins.",
      categories["Footwear"],
      300,
      1
    ),
    createItem(
      "Bata Slippers",
      "Contrary to its name, these slippers prevent you from slipping and falling",
      categories["Footwear"],
      150,
      1
    ),
  ]);
}

async function createCategory(name, description) {
  const category_details = { name };
  if (description) {
    category_details.description = description;
  }
  const category = new Category(category_details);
  await category.save();
  categories[name] = category._id;
}

async function createItem(name, description, category, price, number_in_stock) {
  const item_details = { name, category, price, number_in_stock };
  if (description) {
    item_details.description = description;
  }
  const item = new Item(item_details);
  await item.save();
}
