// ENV Variables
require("dotenv").config()

import express from "express"
import config from "config"

const app = express()

// Middleware
app.use(express.json())

// DataBase
import db from "../config/db"

// Routes
import router from "./router"

// Logger
import Logger from "../config/logger"

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware"

app.use(morganMiddleware)
app.use("/api/", router)

const PORT = config.get<number>("port")

app.listen(PORT, async () => {
  Logger.info("App running on port " + PORT)

  await db()
})