require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const { readdirSync } = require('fs');

const app = express();
const port = process.env.PORT || 4000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)));

// Server function
const server = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    db();
  });
};

server();
