import express from "express";
import { createFriend, getFriendsByOwner, deleteFriend } from "../controllers/friendController.js";

const router = express.Router();

router.post("/", createFriend);
router.get("/", getFriendsByOwner);
router.delete("/:id", deleteFriend);

export default router;