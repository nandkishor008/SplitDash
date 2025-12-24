import Group from "../models/Group.js";

export const createGroup = async (req, res) => {
  try {
    const { ownerId, name, memberIds } = req.body;
    const group = await Group.create({
      owner: ownerId,
      name,
      members: memberIds
    });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const { ownerId } = req.query;
    const groups = await Group.find({ owner: ownerId })
      .populate("members", "name")
      .sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "members",
      "name"
    );
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
