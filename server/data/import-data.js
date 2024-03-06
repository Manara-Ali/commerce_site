const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Meal = require("../models/mealModel");

dotenv.config({
    path: `${__dirname}/../config.env`,
});

const meals = JSON.parse(
  fs.readFileSync(`${__dirname}/meals/meals.json`, "utf-8")
);

const DB = mongoose
  .connect(
    process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
  )
  .then((con) => {
    console.error(`CONNECTED TO ${con.connection?.name} DB!`);
  });

const deleteData = async () => {
  try {
    console.log("Deleting data from DB...");
    await Meal.deleteMany();
    console.log("Deletion complete!");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Closing connection...");
    process.exit(0);
  }
};

const importData = async () => {
  try {
    console.log("Importing data to DB...");
    await Meal.create(meals);
    console.log("Import complete!");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Closing connection...");
    process.exit(0);
  }
};

if(process.argv[2] === "--delete") {
    deleteData();
} else if(process.argv[2] === "--import") {
    importData()
}