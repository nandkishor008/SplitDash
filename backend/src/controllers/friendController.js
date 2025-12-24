import Friend from "../models/Friend.js";

export const createFriend = async (req, res) => {
  try {
    const { ownerId, name } = req.body;
    const friend = await Friend.create({ owner: ownerId, name });
    res.status(201).json(friend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFriendsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.query;
    const friends = await Friend.find({ owner: ownerId }).sort({ name: 1 });
    res.json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
