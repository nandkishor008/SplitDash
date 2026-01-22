import express from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  deleteGroup,
  getGroupByShareToken,
  regenerateShareLink,
  updateShareSettings
} from "../controllers/groupController.js";

const router = express.Router();

// 1. Create and List
router.post("/", createGroup);
router.get("/", getGroups);

// 2.  SPECIFIC SHARE ROUTES (Must come BEFORE /:id)
router.get("/share/:token", getGroupByShareToken);
router.post("/:id/regenerate-link", regenerateShareLink);
router.patch("/:id/share-settings", updateShareSettings);

// 3. GENERIC ID ROUTES (Must come LAST)
router.get("/:id", getGroupById);
router.delete("/:id", deleteGroup);

export default router;