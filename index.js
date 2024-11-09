const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());


cloudinary.config({
    cloud_name: "drek3hhei",
    api_key: "124347812715975",
    api_secret: "T1ET7aguL28wqAFbEVkVDl9zSFA",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: (req, file) => path.extname(file.originalname).slice(1),
        public_id: (req, file) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
            return fileName;
        },
    },
});


const upload = multer({ storage: storage });



// MongoDB connection using Mongoose
mongoose.connect(`mongodb+srv://mamunbdcontact:vxiU36aC5NFvx6oc@jobinterview.vky0v.mongodb.net/todoList?retryWrites=true&w=majority`)
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


app.post('/upload', upload.single("file"), (req, res) => {
    // Log the req.file to verify the file data
    console.log("Uploaded file:", req.file);

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    // Create a new User with the uploaded file path
    UserModel.create({ image: req.file.path })
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error saving file information");
        });
});




// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});