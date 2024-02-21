const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({
    path: `${__dirname}/config.env`,
});

process.on("uncaughtException", (error) => {
    console.log('UNCAUGHT EXCEPTION');
    console.error(error.name, error.message, "💥");
    console.log("server is shutting down all connections...");
    process.exit(1);
});


const app = require("./app")

const DB = mongoose.connect(process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)).then((con) => {
    console.log(`CONNECTED TO ${con.connection?.name} DB!`);
})

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}...`);
});

process.on("unhandledRejection", (error) => {
    console.log('UNHANDLED REJECTION');
    console.error(error.name, error.message, '💥');
    console.log("server is shutting down all connections...");
    server.close(() => {
        process.exit(1);
    });
});