const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/UserRoutes");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/users", router);



mongoose.connect("mongodb+srv://ravintha:n1234@cluster0.9brux.mongodb.net/")
.then(() => console.log("Connected to MonogoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));


require("./Model/Register");
const User = mongoose.model("Register");
app.post("/register",async(req,res)=>{
    const{name,gmail,password}= req.body;
    try{
        await User.create({
            name,
            gmail,
            password,
        })
        res.send({status:"ok"});
    }catch(err){
        res.send({status:"err"});
    }
});