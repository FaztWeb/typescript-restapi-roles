import { connect, connection } from "mongoose";
import { MONGODB_URI } from "./config";

export const connectToDB = async () => {
  try {
    await connect(MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

connection.on("connected", () => {
  console.log(`database is connected`);
});

connection.on("error", (error) => console.error(error));

connection.on("disconnected", async () => {
  await connection.close();
  return process.exit(1);
});
