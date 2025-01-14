const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.delete("/user", async (req, res) => {
    const deleteUser = req.body.userId;

    try{
        const user = await User.findByIdAndDelete({_id : deleteUser});
        res.send("User deleted successfully")
    } catch (err) {
        res.status(400).send("something went wrong")
    }
});

app.patch("/user", async(req, res) => {
    const updateUser = req.body.userId;
    const data = req.body;

    try{
        const user = await User.findByIdAndUpdate({_id: updateUser}, data , {returnDocument: "after"});
        res.send("user updated successfully");
        console.log(user);
    } catch (err) {
        res.status(400).send("something went wrong")
    }
})

app.get("/user", async (req, res) => {

    const userEmail = req.body.email;

    try{
        const user =  await User.findOne({email : userEmail})
        if(!user){
            res.status(404).send("user not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("something went wrong")
    }

});

app.get("/feed", async (req, res) => {


    try{
        const users =  await User.find({})
        if(!users){
            res.status(404).send("user not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("something went wrong")
    }

});

app.post("/signup", async (req, res) => {
    
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User has been added successfully");
    }   catch (err) {
        res.status(400).send("Error in saving User" + err.message);
    }
});


connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("Server is running on port 7777!");
        });
        
    })
    .catch((err) => {
        console.error("Database cannot be connected!!");
    });

