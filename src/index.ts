import app from "./app";
import { connectToDB } from "./database";
import { PORT } from "./config";

async function start() {
  await connectToDB();
  app.listen(PORT);

  console.log("Server on port", PORT);
}

start();
