import * as rawCategoryController from "./category.js";
import * as rawItemController from "./item.js";

function asyncMiddlewareWrapper(middleware) {
  return function (req, res, next) {
    return middleware(req, res, next).catch(next);
  };
}

function wrap(controller) {
  const newController = {};
  for (const key in controller) {
    newController[key] = asyncMiddlewareWrapper(controller[key]);
  }
  return newController;
}

export const categoryController = wrap(rawCategoryController);
export const itemController = wrap(rawItemController);
