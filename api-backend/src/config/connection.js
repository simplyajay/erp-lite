import mongoose from "mongoose";

class DatabaseService {
  constructor(url) {
    this.url = url;
  }

  async connect() {
    try {
      await mongoose.connect(this.url);
      console.log("✅ Database Connected Successfully");
      return true;
    } catch (error) {
      console.error("❌ Database Connection Failed:", error.message);
      return false;
    }
  }
}

export default DatabaseService;
