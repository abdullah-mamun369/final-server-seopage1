const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());




// MongoDB connection using Mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jobinterview.vky0v.mongodb.net/todoList?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));


const UserModel = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    image: String,
}));


//Get attachements from api
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();  // Fetch all users from the UserModel collection
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Failed to fetch users" });
    }
});



const TodoModel = mongoose.models.Todo || mongoose.model('Todo', new mongoose.Schema({
    status: String,
    clientName: String,
    clientImgUrl: String,
    userName: String,
    userImg: String,
    todoDetails: String,
    totalPage: Number,
    userView1: String,
    userView2: String,
    totalRead: Number,
    totalComment: Number,
    totalAttachements: Number,
    date: Number,
}));


//Get todos from api
app.get('/todos', async (req, res) => {
    try {
        const todos = await TodoModel.find();  // Fetch all users from the UserModel collection
        res.json(todos);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Failed to fetch users" });
    }
});


// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});