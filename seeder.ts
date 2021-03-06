import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

//Load env vars
dotenv.config({
  path: "./config/config.env",
});

//Load Models
import { Bootcamp } from "./models/Bootcamp";
import { Course } from "./models/Course";
/* var Bootcamp = mongoose.model('Bootcamp');
var Course = mongoose.model('Course');
 */
//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    //await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany({});
    await Course.deleteMany({});
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  console.log("here");
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
