require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const {readdirSync} = require('fs');

const app = express();
const port = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());

//readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/'+route)));


const server = () => {
    app.listen(port, () => {
        console.log('server is listening on port 4000');
        db();
    })
}
server();