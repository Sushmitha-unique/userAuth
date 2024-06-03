const mongoose = require('mongoose')
const url = "mongodb://localhost/login"
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection
con.on('open',()=>{
    console.log("connected")
})
const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("user",loginSchema )
 module.exports = collection;