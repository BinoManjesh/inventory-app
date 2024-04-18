import { Router } from "express";
import { itemController, categoryController } from "../controllers/index.js";

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

router.get("/home", function (req, res) {
  res.render("index");
});

router.use("/categories", getRouter(categoryController));
router.use("/items", getRouter(itemController));

export default router;
