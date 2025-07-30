import { IncomingMessage, Server, ServerResponse } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const port = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://introToMongoose:qte0n2tjgPZVpKd6@cluster0.cwzf5.mongodb.net/noteWithMongoose?retryWrites=true&w=majority&appName=Cluster0"
    );
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

