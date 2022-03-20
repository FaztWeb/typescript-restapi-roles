import { Request, Router, Response } from "express";
const router = Router();

const pkg = require("../../package.json");

router.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Welcome to my Products API",
    // name: pkg.name,
    // version: pkg.version,
    // description: pkg.description,
    // author: pkg.author,
  });
});

export default router;
