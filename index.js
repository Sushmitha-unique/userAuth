const express= require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./src/config')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.render("login")
})
app.get('/signup',(req,res)=>{
    res.render("signup")
})
app.post('/signup', async (req,res)=>{
  const data =new collection( {
    name: req.body.username,
    password:req.body.password
  })
  const exisitingUser = await collection.findOne({
    name:data.name
  })
  if(exisitingUser){
    res.send("User already exists")
  }
  else{
  try{
    const salt =10;
    const hashpassword = await bcrypt.hash(data.password,salt)
    data.password = hashpassword
  
  const userdata = await data.save()
  res.send("user signup successfully")
  
  }
  catch(err){
    res.send("Error "+ err)
    }
  }
})
app.post('/login', async (req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.username})
        if(!check){
         res.send("user not found")
        }
        const ispassword = await bcrypt.compare(req.body.password,check.password)
        if(ispassword)
            {
                res.render("home")
            }
            else{
                res.send("wrong password")
            }
    }catch{
         res.send("wrong details")
    }
})
const port = 3030
app.listen(port,(req,res)=>{
    console.log("Server started")
})