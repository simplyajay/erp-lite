import dotenv from "dotenv";

class EnvConfigService {
  constructor() {
    this.loadEnvironment();
  }

  loadEnvironment() {
    const envFile = this.getEnvFile();
    dotenv.config({ path: envFile });
  }

  getEnvFile() {
    const env = process.env.NODE_ENV || "development";
    return `.env.${env}`;
  }

  get(key) {
    return process.env[key];
  }
}

const envConfig = new EnvConfigService();
export default envConfig;
