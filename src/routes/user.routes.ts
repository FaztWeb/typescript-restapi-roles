import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/user.controller";
import {
  checkDuplicateUsernameOrEmail,
  isAdmin,
  verifyToken,
} from "../middlewares";

router.post(
  "/",
  [verifyToken, isAdmin, checkDuplicateUsernameOrEmail],
  createUser
);

export default router;
