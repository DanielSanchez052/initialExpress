import express from 'express'
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import expressJSDocSwagger from 'express-jsdoc-swagger'

import pkg from '../package.json' assert {type: "json"}
import definition from './docs/definition.js'
import config from '../config.js'

import authRoutes from './modules/auth/auth.routes.js'
import roleRoutes from './modules/role/role.routes.js'
import verifyToken from './modules/auth/auth.middlewares.js'

const app = express()

//settings
app.set("pkg",pkg)
app.set("port", config.PORT)


//config cors
const corsConfig= {
  origin:"*"
}
app.use(cors(corsConfig))

//middlewares
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())


//docs
expressJSDocSwagger(app)(definition)


//initial route
app.get("/api/v1/", (req, res) => {
    res.json({
        message: "API Rest",
        name: app.get("pkg").name,
        version: app.get("pkg").version,
        description: app.get("pkg").description,
        author: app.get("pkg").author,
    });
});


//routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/role", roleRoutes)


export default app

