import { RolModel as Role, UserModel as User } from "../models";
import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.countDocuments();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const result = await Role.insertMany([
      { name: "user" },
      { name: "moderator" },
      { name: "admin" },
    ]);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });

  // get roles _id
  const roles = await Role.find(
    { name: { $in: ["admin", "moderator"] } },
    { _id: 1 }
  );

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      // roles: roles.map((role) => role._id),
      roles,
    });
    console.log("Admin User Created!");
  }
};
