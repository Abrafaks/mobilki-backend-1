import express, { Request, Response } from "express";
import { validate } from "./middleware/validators/validator";
import userValidator from "./middleware/validators/user.validator";
import userController from "../controllers/user.controller";
import { auth, Strategy } from "./middleware/strategies/auth";

const router = express.Router();

router.post(
  "/",
  userValidator.validateUser(),
  validate,
  (req: Request, res: Response) => userController.register(req, res)
);

router.put(
  "/",
  auth.authenticate([Strategy.Bearer]),
  userValidator.validateUpdateUser(),
  validate,
  (req: Request, res: Response) => userController.update(req, res)
);

export default router;
