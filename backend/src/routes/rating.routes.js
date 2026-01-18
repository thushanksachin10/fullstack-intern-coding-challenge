import express from "express";
import { submitRating } from "../controllers/rating.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["USER"]));

router.post("/", submitRating);

export default router;
