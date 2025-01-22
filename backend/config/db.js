const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connection established");
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { db };