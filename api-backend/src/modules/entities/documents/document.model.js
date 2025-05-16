import mongoose, { Schema } from "mongoose";

const DocumentSchema = new Schema(
  {
    _ownerId: { type: Schema.Types.ObjectId, required: true },
    type: {
      type: String,
      enum: [
        "purchase_order",
        "sales_order",
        "invoice",
        "bill",
        "return_order",
        "credit_note",
        "quotation",
      ],
      required: true,
    },
    _entityId: { type: Schema.Types.ObjectId, required: true }, //supplier or customer
    _documentId: { type: String, required: true },
    date: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        description: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        unitOfMeasurement: { type: String, required: true },
      },
    ],
    vatAmount: { type: Number, required: true },
    vatRate: { type: Number, required: true }, // vat rate in percent
    vatType: { type: String, enum: ["inclusive", "exclusive"], required: true }, // inclusive, exclusive, or other vat types
    costBeforeVat: { type: Number, required: true },
    costAfterVat: { type: Number, required: true },
    taxWithHeldAmount: { type: Number },
    withHoldingTaxRate: { type: Number }, // in percent
    withHoldingTaxAmount: { type: Number },
    note: { type: String },
    memorandum: { type: String },
    documentStatus: {
      type: String,
      enum: ["complete", "pending", "cancelled", "rejected", "accepted"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "partially_paid", "overdue", "open", "not_applicable"],
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", DocumentSchema);
export default Document;
