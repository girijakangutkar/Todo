const mongoose = require("mongoose");
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? "./.env.test" : "./.env",
});

beforeAll(async () => {
  if (!process.env.Mongo_URI) {
    throw new Error("Mongo_URI is not defined in environment variables");
  }
  await mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  });
  console.log(process.env.Mongo_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log("DB Deleted");
});
