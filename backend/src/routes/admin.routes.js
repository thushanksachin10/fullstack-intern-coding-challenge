import express from "express";
import {
  getDashboardStats,
  getUsers,
  getStores,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["ADMIN"]));

router.get("/dashboard", getDashboardStats);
router.get("/users", getUsers);
router.get("/stores", getStores);

export default router;
