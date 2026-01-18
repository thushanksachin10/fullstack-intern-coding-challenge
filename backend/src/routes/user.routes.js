import express from "express";
import { getStoresForUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["USER"]));

router.get("/stores", getStoresForUser);

export default router;
