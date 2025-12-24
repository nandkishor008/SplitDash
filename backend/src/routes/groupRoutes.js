import express from "express";
import {
  createGroup,
  getGroups,
  getGroupById
} from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);

export default router;
