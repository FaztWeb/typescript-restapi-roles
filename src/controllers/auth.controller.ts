import { Request, Response } from "express";
import { UserModel as User, RolModel as Role } from "../models";

import jwt from "jsonwebtoken";
import { SECRET } from "../config";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, roles } = req.body;

  try {
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const foundRole = await Role.findOne({ name: "user" });
      newUser.roles = [foundRole?._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await userFound.comparePassword(req.body.password);

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
