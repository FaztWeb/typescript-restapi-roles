import { Router } from "express";
import { verifyToken, isModerator, isAdmin } from "../middlewares";

const router = Router();

import * as productsCtrl from "../controllers/products.controller";

router.get("/", productsCtrl.getProducts);

router.get("/:productId", productsCtrl.getProductById);

router.post("/", [verifyToken, isModerator], productsCtrl.createProduct);

router.put(
  "/:productId",
  [verifyToken, isModerator],
  productsCtrl.updateProductById
);

router.delete(
  "/:productId",
  [verifyToken, isAdmin],
  productsCtrl.deleteProductById
);

export default router;
