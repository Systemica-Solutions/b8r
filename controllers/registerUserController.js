import registeredUsersModel from "../models/registeredUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "NOTESAPI";

//ADD
export const registerUsersPost = async (req, res, next) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    phone,
    agent_type,
    status,
    type,
  } = req.body;

  try {
    //Check exesting Users
    const existingUser = await registeredUsersModel.findOne({ username });
    if (existingUser) {
      return res.status(401).json({ error: " User Already Registered" });
    }

    //Hasing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await registeredUsersModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      agent_type: agent_type,
      status: status,
      type: type,
    });

    //JWT Token
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const loginauth = async (req, res, next) => {
  const { username, password } = req.body;


  try {
    const existingUser = await registeredUsersModel.findOne({ username });
    if (!existingUser) {
    console.log("User Not Found");
      return res.status(404).json({ error: "User Not Found" });
    }
    // if (existingUser) {
    //   return res.status(401).json({ error: " User Already LoggedIn" });
    // }

    //Match Password
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { email: existingUser.username, id: existingUser._id },
      SECRET_KEY
    );

    return res
      .status(200)
      .json({
        user: existingUser.username,
        name: existingUser.first_name,
        token: token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
