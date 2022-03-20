import { Request, Response } from "express";
import { UserModel as User, RolModel as Rol } from "../models";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Rol.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};
