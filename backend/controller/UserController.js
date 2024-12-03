const User = require("../model/UserModel");
exports.registerUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      throw new Error("Please enter the username!!");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error(
        "Username already exists!. Please enter different Username."
      );
    }

    const newUser = await User.create({ username });
    res.status(201).json({ message: "User registered successfully!", newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
