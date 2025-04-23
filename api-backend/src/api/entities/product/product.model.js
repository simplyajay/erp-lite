import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    _ownerId: { type: Schema.Types.ObjectId, required: true },
    sku: { type: String, required: true },
    name: { type: String, required: true },
    barcode: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    unitOfMeasurement: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ sku: 1 }, { collation: { locale: "en", strength: 1 } });
ProductSchema.index({ barcode: 1 }, { collation: { locale: "en", strength: 1 } });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
