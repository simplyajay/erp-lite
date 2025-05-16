import mongoose, { Schema } from "mongoose";

const BusinessEntitySchema = new Schema(
  {
    _ownerId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["customer", "supplier"], required: true },
    name: { type: String, required: true },
    trn: { type: String },
    description: { type: String },
    note: { type: String },
    website: { type: String },
    address: {
      street1: { type: String },
      street2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    contact: {
      title: { type: String },
      firstname: { type: String },
      middlename: { type: String },
      lastname: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    creditlimit: { type: Number },
    openbalance: { type: Number, default: 0 },
    totaloverdue: { type: Number, default: 0 },
    status: { type: String, enum: ["inactive", "active"], required: true },
    image: { type: String },
  },
  { timestamps: true }
);

BusinessEntitySchema.index({ trn: 1 }, { collation: { locale: "en", strength: 1 } });

const BusinessEntity = mongoose.model("BusinessEntity", BusinessEntitySchema);
export default BusinessEntity;
