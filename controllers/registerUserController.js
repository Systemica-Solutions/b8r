import registeredUsersModel from "../models/registeredUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "B";

//ADD
export const registerUsersPost = async (req, res, next) => {
  const {
    email,
    full_name,
    password,
    c_password,
    icode,
    phone,
    status,
  } = req.body;

  try {
    //Check exesting Users
    const existingUser = await registeredUsersModel.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: " User Already Registered" });
    }

    //Hasing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await registeredUsersModel.create({
      
      email: email,
      full_name: full_name,
      password: hashedPassword,
      c_password: hashedPassword,
      icode: icode,
      phone: phone,
      status: status,
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
  const { email, password } = req.body;


  try {
    const existingUser = await registeredUsersModel.findOne({ email });
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
        user: existingUser.email,
        name: existingUser.full_name,
        token: token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
