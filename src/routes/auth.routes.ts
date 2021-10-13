import express, { Request, Response } from "express";
import { Strategy, auth } from "./middleware/strategies/auth";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/login",
  auth.authenticate([Strategy.Basic]),
  (req: Request, res: Response) => authController.login(req, res)
);

export default router;
