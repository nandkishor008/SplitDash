import Group from "../models/Group.js";
import crypto from "crypto";

// --- Standard CRUD ---

export const createGroup = async (req, res) => {
  try {
    const { ownerId, name, memberIds } = req.body;
    const group = await Group.create({
      owner: ownerId,
      name,
      members: memberIds,
      // Default share settings are handled by the Schema now
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
    const group = await Group.findById(req.params.id).populate("members", "name");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json({ success: true, message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete group" });
  }
};

// --- 🔗 Share System Logic ---

export const getGroupByShareToken = async (req, res) => {
  try {
    // Find group by the token
    const group = await Group.findOne({ shareToken: req.params.token })
      .populate("members", "name");

    if (!group) {
      return res.status(404).json({ message: "Link invalid" });
    }
    
    // Check if sharing is actually enabled
    if (!group.shareEnabled) {
      return res.status(403).json({ message: "Sharing is disabled for this group" });
    }

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const regenerateShareLink = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Generate new random token
    group.shareToken = crypto.randomBytes(16).toString("hex");
    await group.save();

    res.json({ shareToken: group.shareToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateShareSettings = async (req, res) => {
  try {
    const { shareEnabled, sharePermission } = req.body;

    // Validate permission enum if provided
    if (sharePermission && !["viewer", "editor"].includes(sharePermission)) {
      return res.status(400).json({ message: "Invalid permission level" });
    }

    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { shareEnabled, sharePermission },
      { new: true } // Return updated doc
    );

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};