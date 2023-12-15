const express = require('express');
const path = require('path');  // Corrected the typo in 'path'
const bcrypt = require('bcrypt');
const collection=require("./config");
const { name } = require('ejs');


const app = express();
// covert data into json format  
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
// static file
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.post("/signup",async(req,res)=>{
  const data={
    name:req.body.username,
    password:req.body.password

  }
  const existingUser=await collection.findOne({name:data.name})
  if(existingUser){
    res.send("user already exist .choose different one")
  }
  else{
    // hack passowd
     const saltround=10;
     const hashpass=await bcrypt.hash(data.password,saltround);
     data.password=hashpass;
      const userdata=await collection.insertMany(data);
      console.log(userdata);

  }
});
app.post("/login",async(req,res)=>{
   try{
    const check=await collection.findOne({name:req.body.username});
    if(!check){
        res.send("user name cannot found")
    }
    const ispass=await bcrypt.compare(req.body.password,check.password);
    if(ispass){
        res.redirect("https://code-pain.vercel.app/")
    }else{
        req.send("wrong password")
    }
   }catch{
    res.send("wrong detail");
   }
});
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


