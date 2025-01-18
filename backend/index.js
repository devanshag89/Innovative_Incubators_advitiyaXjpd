
const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const {readdirSync} = require('fs');
require('dotenv').config();
const Talent=require('./routes/talent')
const app = express();
const port = process.env.PORT||4000;

//middleware
app.use(cors());
app.use(express.json());

// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/'+route)));
app.use('/talent',Talent);

const server = () => {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
        db();
    })
}
server();