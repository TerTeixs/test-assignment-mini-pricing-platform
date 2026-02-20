import express from "express";
import { getBulkPricing } from "./controller.js";

const router = express.Router();

router.get("/:id", getBulkPricing);

export default router;
