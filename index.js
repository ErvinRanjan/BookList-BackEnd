import express from "express";
import {PORT,mongoDBURL} from "./config.js"
import mongoose from 'mongoose'
import booksRoute from "./routes/booksRoute.js"
import cors from "cors" 

const app = express();

//middleware to use json
app.use(express.json())
app.use(cors(
    {
        origin:"*",
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type']
    }
))
app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('Hello')
})
app.use("/books",booksRoute)
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to db")
        app.listen(PORT,()=>console.log(`listening on port ${PORT}`))
    })
    .catch((error)=>{
        console.log(error)
    })