import Redis from "ioredis";
import envConfig from "./env.config.js";

class RedisConfig {
  constructor() {
    this.redis = null;
    this.connected = false;
    this.connecting = false;
  }

  async connect() {
    if (this.connected || this.connecting) return;

    this.connecting = true;

    this.redis = new Redis({
      host: envConfig.get("REDIS_HOST"),
      port: envConfig.get("REDIS_PORT"),
      connectTimeout: 1500,
      retryStrategy: () => null, //im controlling retry
    });

    this.redis.on("end", () => {
      this.connected = false;
      console.warn("Redis Connection Closed");
    });

    this.redis.on("error", (error) => {
      console.error("Redis error: ", error);
    });

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.redis.off("ready", onReady);
        this.redis.off("error", onError);
      };

      const onReady = () => {
        this.connected = true;
        this.connecting = false;
        console.log("Redis Connected Successfully");
        resolve();
        cleanup();
      };

      const onError = (error) => {
        this.connected = false;
        this.connecting = false;
        console.log("Redis Connection Failed");
        reject(error);
        cleanup();
      };

      this.redis.once("ready", onReady);
      this.redis.once("error", onError);
    });
  }

  isConnected() {
    return this.connected;
  }

  getClient() {
    return this.redis;
  }
}

const redisConfig = new RedisConfig();

export default redisConfig;
