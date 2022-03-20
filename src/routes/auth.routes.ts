import { Router } from "express";
const router = Router();

import { signin, signUp } from "../controllers/auth.controller";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../middlewares";

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  signUp
);

router.post("/signin", signin);

export default router;
