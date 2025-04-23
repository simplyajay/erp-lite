import express from "express";
import cors from "cors";
import envConfig from "./config/env.config.js";
import DatabaseService from "./config/connection.js";
import cookieParser from "cookie-parser";
import registerRoutes from "./api/index.js";

const app = express();

const port = envConfig.get("PORT");
const url = envConfig.get("MONGODB_URL");
const databaseService = new DatabaseService(url);

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
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } else {
    console.error("❌ Exiting: Could not connect to the database.");
    process.exit(1);
  }
})();
