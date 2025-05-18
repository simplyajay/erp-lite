import redisConfig from "../../config/redis.config.js";

class RedisService {
  constructor() {
    this.redis = redisConfig.getClient();
  }

  async get(key) {
    if (!redisConfig.isConnected()) return null;

    try {
      return await this.redis.get(key);
    } catch (error) {
      console.warn("Redis error getting key: ", error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 60) {
    if (!redisConfig.isConnected()) return;

    try {
      if (ttlSeconds > 0) {
        await this.redis.set(key, value, "EX", ttlSeconds);
      } else {
        await this.redis.set(key, value);
      }
    } catch (error) {
      console.warn("Redis error setting key: ", error);
      return;
    }
  }

  async delete(key) {
    if (!redisConfig.isConnected()) return;

    try {
      await this.redis.del(key);
    } catch (error) {
      console.warn("Redis error setting key: ", error);
      return;
    }
  }

  async setJSON(key, value, ttlSeconds = 60) {
    return this.set(key, JSON.stringify(value), ttlSeconds);
  }

  async getJSON(key) {
    const raw = await this.get(key);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("Redis error parsing key: ", error);
    }
  }
}

export default new RedisService();
