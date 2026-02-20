import express from "express";
import { quotePricing } from "./controller.js";

const router = express.Router();

// router.get("/", listRule);
router.post("/price", quotePricing);

export default router;
