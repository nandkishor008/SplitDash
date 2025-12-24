import express from "express";
import {
  createFriend,
  getFriendsByOwner
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/", createFriend);
router.get("/", getFriendsByOwner);

export default router;
