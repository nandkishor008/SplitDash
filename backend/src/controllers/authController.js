import User from "../models/User.js";

export const loginOrSignup = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    } else if (name && user.name !== name) {
      user.name = name;
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
