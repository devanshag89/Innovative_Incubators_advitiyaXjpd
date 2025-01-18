const mongoose = require('mongoose');

const db = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/ShowcaseX');
        console.log("database connection established");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {db};