import { Router } from "express";
import { itemController, categoryController } from "../controllers/index.js";
import { Item, Category } from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";

function getRouter({
  create_get,
  create_post,
  list,
  detail,
  update_get,
  update_post,
  delete_get,
  delete_post,
}) {
  const router = Router();

  router.get("/new", create_get);
  router.post("/new", create_post);

  router.get("/", list);
  router.get("/:id", detail);

  router.get("/:id/update", update_get);
  router.post("/:id/update", update_post);

  router.get("/:id/delete", delete_get);
  router.post("/:id/delete", delete_post);

  return router;
}

const router = Router();

router.get("/", function (req, res) {
  res.redirect("/home");
});

router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const [n_items, n_categories] = await Promise.all([
      Item.countDocuments({}).exec(),
      Category.countDocuments({}).exec(),
    ]);
    res.render("index", { n_items, n_categories });
  })
);
router.use("/categories", getRouter(categoryController));
router.use("/items", getRouter(itemController));

export default router;
