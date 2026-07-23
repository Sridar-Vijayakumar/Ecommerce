const express = require("express");

const app= express();
const PORT =9999;

const user =[ {id:1, name:"Ashwin"}]

app.get("/User",(req,res)=>{
    res.send(user)
    console.log(user)
})

app.listen(PORT,()=>{
    console.log("App is running")
})