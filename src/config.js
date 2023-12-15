const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");

connect.then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log("Database connection error:", err);
});

// Create schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("users", loginSchema);
module.exports = collection;
