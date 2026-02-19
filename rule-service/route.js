import express from "express";
import { createRule, deleteRule, listRule, updateRule } from "./controller.js";

const router = express.Router();

router.get("/", listRule);
router.post("/", createRule);
router.put("/", updateRule);
router.delete("/:id", deleteRule);

export default router;
