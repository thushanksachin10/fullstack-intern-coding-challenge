import express from "express";
import { getStoreDashboard } from "../controllers/storeOwner.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["STORE_OWNER"]));

router.get("/dashboard", getStoreDashboard);

export default router;
