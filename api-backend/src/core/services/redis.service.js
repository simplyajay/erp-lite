import Redis from "ioredis";
import envConfig from "../../config/env.config.js";
const redisHost = envConfig.get("REDIS_HOST");
const redisPort = envConfig.get("REDIS_PORT");

class RedisService {
  constructor() {
    this.redis = null;
    this.connected = false;

    try {
      this.redis = new Redis({
        host: redisHost,
        port: redisPort,
        connectTimeout: 1500,
      });

      this.redis.on("connect", () => {
        console.warn("Redis is connected");
        this.connected = true;
      });
      this.redis.on("error", (error) => {
        console.warn("Redis ERROR: ", error);
        this.connected = false;
      });
    } catch (error) {
      console.warn("Redis connection failed", error);
    }
  }

  async get(key) {
    if (!this.connected) return null;

    try {
      return await this.redis.get(key);
    } catch (error) {
      console.warn("Error getting key: ", error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 60) {
    if (!this.connected) return;

    try {
      if (ttlSeconds > 0) {
        await this.redis.set(key, value, "EX", ttlSeconds);
      } else {
        await this.redis.set(key, value);
      }
    } catch (error) {
      x;
      console.warn("Error setting key: ", error);
      return;
    }
  }
}

export default new RedisService();
