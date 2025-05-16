import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    _orgId: { type: Schema.Types.ObjectId },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    image: { type: String },
    role: { type: String, enum: ["owner", "admin", "user"], required: true },
  },
  { timestamps: true }
);

UserSchema.index({ username: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });
UserSchema.index(
  { phone: 1 },
  { unique: true, sparse: true, collation: { locale: "en", strength: 1 } }
);

const User = mongoose.model("User", UserSchema);
export default User;
