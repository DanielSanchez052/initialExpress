import express from 'express'
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from '../package.json'

import authRoutes from './routes/auth.routes.js'
import verifyToken from './middlewares/authmiddlewares.js'

const app = express()

//settings
app.set("pkg",pkg)
app.set("port", process.env.PORT || 4000)


//Middlewaresm 
const corsConfig= {
    // origin:"http://localhost:3000"
}

app.use(cors(corsConfig))
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

//Initial route
app.get("/", (req, res) => {
    res.json({
        message: "API Rest",
        name: app.get("pkg").name,
        version: app.get("pkg").version,
        description: app.get("pkg").description,
        author: app.get("pkg").author,
    });
});

app.get("/api/task" , verifyToken,(req,res)=>{

    res.json({message:"Tasks"})
})

//Routes
app.use("/api/auth", authRoutes)

export default app

