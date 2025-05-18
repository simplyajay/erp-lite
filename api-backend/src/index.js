import express from "express";
import cors from "cors";
import envConfig from "./config/env.config.js";
import DatabaseService from "./config/database.config.js";
import cookieParser from "cookie-parser";
import registerRoutes from "./modules/index.js";
import os from "os";

const app = express();
const backendPort = envConfig.get("PORT");
const backendUrl = envConfig.get("MONGODB_URL");
const databaseService = new DatabaseService(backendUrl);
console.log("Running on: ", os.platform());

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

(async () => {
  const connected = await databaseService.connect();
  if (connected) {
    registerRoutes(app);
    app.listen(backendPort, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${backendPort}`);
    });
  } else {
    console.error("❌ Exiting: Could not connect to the database.");
    process.exit(1);
  }
})();
