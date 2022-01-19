const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb+srv://praveen7:prmdb7@cluster0.tkryy.mongodb.net/?retryWrites=true&w=majority";

let usersList = [];
app.use(express.json())
app.use(cors({
    origin: "*"
}))



app.post("/createproduct", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("mobiledata")
        await db.collection("mobile").insertOne(req.body)
        await connection.close();
        res.json({ message: "User Added" })
    } catch (error) {
        console.log(error)
    }
});


    app.post("/key", async function (req, res) {
        try {
            let connection = await mongoClient.connect(URL);
            let db = connection.db("mobiledata");
            let users = await db.collection("mobile").find({product:req.body.key}).toArray();
            await connection.close();
            res.json(users);
        } catch (error) {
            console.log(error)
        }
        // res.json(usersList)
    });

    app.get("/dash", async function (req, res) {
        try {
            let connection = await mongoClient.connect(URL);
            let db = connection.db("mobiledata");
            let users = await db.collection("mobile").find({}).toArray();
            await connection.close();
            res.json(users);
        } catch (error) {
            console.log(error)
        }
        // res.json(usersList)
    });




    app.listen(process.env.PORT || 3000)
