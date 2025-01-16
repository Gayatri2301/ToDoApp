const mongoose = require("mongoose");
const collection = require("./model.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.urlencoded({
    extended : true
}));

try {
    mongoose.connect(
        "mongodb+srv://oneshop982:oneshop982@cluster0.0pezb70.mongodb.net/oneshop?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected");
} catch (error) {
    console.log(error);
}

app.listen(4000, () => {
    console.log("Server listening on port 4000");
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/update", async (req, res) => {
    const { email, items } = req.body;
    console.log(email, items);
    try {
        const doc = await collection.findOne({ email: email });
        if (doc) {
            console.log(doc._id);
            try {
                await collection.findByIdAndUpdate(
                    doc._id,
                    { items: items },
                    {
                        new: true,
                        runValidators: true,
                    }
                    
                );
                res.send("success");
            } catch (error) {
                console.log(error);
                res.status(500).send("Error");
            }
        } else {
            console.log(res.body);
            res.status(400).send("email not found");
        }
    } catch (error) {
        console.log(error);
    }
});

app.get('/items',async (req,res)=>{
    const email = req.header('email');
    console.log(email);
    try {
        const doc = await collection.findOne({ email: email });
        if(doc){
            console.log("came");
            res.json({data:doc.items});
        }else{
            res.status(400).send('User Not Found');
        }
    } catch (error) {
        res.status(500).send('Error');
    }
})

app.post('/register',async (req,res)=>{
    const {email, password} = req.body;
    console.log(email,password);
    try {
        const doc = await collection.findOne({email});
        console.log(doc);
        
        if(!(doc === null)){
            res.status(400).send("User already exist");
            return
        }
        const newUser = new collection({
            email,
            password,
            items:[]
        });
        newUser.save();
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
    
})

app.post('/Login',async (req,res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try {
        const doc = await collection.findOne({email});
        if(doc){
            console.log(doc);
            if(password === doc.password){
                res.json(doc);
            }
            else{
                res.status(400).send("Incorrect password");
            }
        }
        else{
            console.log(doc);
            res.status(204).send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
})