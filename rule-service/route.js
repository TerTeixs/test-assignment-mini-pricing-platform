import express from "express";
import { createRule, deleteRule, listRule } from "./controller.js";

const router = express.Router();

router.get("/", listRule);
router.post("/", createRule);
router.delete("/:id", deleteRule);

export default router;
