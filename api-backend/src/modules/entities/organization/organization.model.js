import mongoose, { Schema } from "mongoose";

const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true },
    trn: { type: String },
    address: {
      street1: { type: String },
      street2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    phone: { type: String },
    email: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

OrganizationSchema.index({ phone: 1 }, { collation: { locale: "en", strength: 1 } });
OrganizationSchema.index({ email: 1 }, { collation: { locale: "en", strength: 1 } });
//OrganizationSchema.index({ trn: 1 }, { collation: { locale: "en", strength: 1 } });

const Organization = mongoose.model("Organization", OrganizationSchema);
export default Organization;
