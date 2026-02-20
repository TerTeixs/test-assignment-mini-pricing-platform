import express from "express";
import { quoteBulk, quotePricing } from "./controller.js";

const router = express.Router();

// router.get("/", listRule);
router.post("/price", quotePricing);
router.post("/bulk", quoteBulk);

export default router;
