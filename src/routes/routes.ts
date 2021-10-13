import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import express from "express";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
