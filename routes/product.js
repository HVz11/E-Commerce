const express = require("express");
const router = express.Router();

const {
  create,
  read,
  productById,
  list,
  listRelated,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { remove, update } = require("lodash");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/products", list);
router.get("/prodducts/related/:productId", listRelated);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
