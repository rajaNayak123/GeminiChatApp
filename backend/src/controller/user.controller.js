import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (
      [fullname,email, password].some((field) => {
        field?.trim() === "";
      })
    ) {
      return res.status(400).json({ error: "All fields must be required" });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ error: "User or email already exists" });
    }

    const newUser = await User({
      fullname,
      email,
      password,
    });

    await newUser.save();

    const token = await newUser.generateToken();

    res.status(201).json({
      message: "User created successfully",
      user: {
        fullname: newUser.fullname,
        email: newUser.email,
        // password: newUser.password,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ mesage: "Email is required" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await user.isCorrectPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Password is incorrect" });
  }

  const token = await user.generateToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200).cookie("token", token, options).json({ user, token });
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
  req.user._id,
    {
      $set: { token: undefined },
    },
    {
      new: true,
    }
);

const options ={
  httpOnly: true,
  secure: true,
};

res
.status(200)
.clearCookie("token", options)
.json(200,"user logout successfully")

};

const profileUser = (req, res) => {
  return res.
   status(200).
   json({
    user:req.user,
    message:"Current user profile fetched successfully"
   });
};

const getAllUsers = async (req, res) => {
  const userId = req.user._id
  // Get all users those have not logged in
  const users = await User.find({
    id: {$ne:userId}
  })

  return res.status(200).json({users:users});
}

export {registerUser,loginUser,logoutUser,profileUser,getAllUsers};