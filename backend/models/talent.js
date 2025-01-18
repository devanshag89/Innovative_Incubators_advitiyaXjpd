const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const talentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    phoneNo:{
        type:Number,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    category:{
        type:String,
        required:true,
    },
    skills:{
        type:[String],
        required:true
    },
    personalDescription:{
        type:String,
        required:true,
        maxlength:300,
    },
    profilePhoto:{
        type:String,
        required:false,
    },

})

const Talent=mongoose.model('Talent',talentSchema);
module.exports=Talent;