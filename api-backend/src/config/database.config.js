import mongoose from "mongoose";
import envConfig from "./env.config.js";

class DatabaseConfig {
  constructor() {
    this.url = envConfig.get("MONGODB_URL");
    this.connected = false;
    this.connecting = false;
    this.reconnecting = false;
    this.retryDelay = 2000;
    this.currentRetries = 0;
    this.maxRetries = 3;
    this._setupEventListeners();
  }

  async connect() {
    if (this.connected || this.connecting) return;

    this.connecting = true;

    try {
      await mongoose.connect(this.url);
      this.currentRetries = 0; // reset on successful connection
      return true;
    } catch (error) {
      console.error("MongoDb error: Initilization failed ", error.message);
      this.connecting = false;
      this.connected = false;
      await this.reconnect();
      return false;
    }
  }

  async reconnect() {
    if (this.reconnecting) return;

    this.reconnecting = true;

    if (this.currentRetries >= this.maxRetries) {
      console.error("MongoDb error: Maximum number of retries reached");
      process.exit(1);
    }

    this.currentRetries++;

    await new Promise((resolve) => setTimeout(resolve, this.retryDelay)); // delay the retry
    await this.connect();

    this.reconnecting = false;
  }

  isConnected() {
    return this.connected;
  }

  _setupEventListeners() {
    mongoose.connection.on("connected", () => {
      console.log("MongoDb Connected Successfully");
      this.connected = true;
      this.connecting = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected! Trying to reconnect...");
      this.connected = false;
      this.connecting = false;
      this.reconnect();
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected!");
      this.connected = true;
      this.connecting = false;
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB error:", error);
      this.connected = false;
      this.connecting = false;
      this.reconnect();
    });
  }
}

const dbConfig = new DatabaseConfig();
export default dbConfig;
