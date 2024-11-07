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




// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});