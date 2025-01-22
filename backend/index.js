require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const { readdirSync } = require('fs');


const app = express();
const port = process.env.PORT || 4000;



app.use(cors());
app.use(express.json());


readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)));


const server = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    db();
  });
};
const hireRoutes = require('./routes/hireRoutes');
app.use('/api/v1', hireRoutes);

server();
