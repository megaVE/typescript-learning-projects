import mongoose from "mongoose"
import config from "config"

import Logger from "./logger"

async function connect() {
  const dbUri = config.get<string>("dbUri")

  try {
    await mongoose.connect(dbUri)
    Logger.info("Connected to database")
  } catch (error) {
    Logger.error("Error while connecting to database: ", error)

    process.exit(1)
  }
}

export default connect
