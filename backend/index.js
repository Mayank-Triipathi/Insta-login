const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "instagram-clone-login-page")));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const User = mongoose.model("User", {
    username: String,
    password: String
});

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});


app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    await User.insertOne({ username, password });

    
    res.json({ "done": true });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});