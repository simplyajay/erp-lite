import * as Yup from "yup";

export const getStockFormConfig = ({ onSubmit, onCancel }) => ({
  fields: [
    { key: "sku", type: "text", label: "SKU" },
    { key: "name", type: "text", label: "Product Name" },
    { key: "barcode", type: "text", label: "Barcode" },
    {
      key: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Product Description...",
    },
    {
      key: "unitOfMeasurement",
      type: "select",
      label: "OUM",
      default: { key: "default", value: "--SELECT---" },
      options: ["PCS", "PKT", "CTN", "OTR"],
    },
    { key: "quantity", type: "text", label: "Quantity", disabled: true },
    { key: "price", type: "text", label: "Selling Price" },
  ],
  layout: [
    [{ key: "sku" }, { key: "name" }],
    [{ key: "barcode" }],
    [{ key: "description" }],
    [{ key: "unitOfMeasurement" }, { key: "price" }, { key: "quantity" }],
  ],
  buttons: {
    submit: { placeholder: "Save", fn: onSubmit },
    cancel: { placeholder: "Cancel", fn: onCancel },
  },
});

export const ProductSchema = Yup.object({
  sku: Yup.string().nullable().required("SKU is required"),
  barcode: Yup.string().nullable().required("Barcode is required"),
  name: Yup.string().nullable().required("Product name is required"),
  description: Yup.string().nullable(),
  unitOfMeasurement: Yup.string()
    .oneOf(["PCS", "PKT", "CTN", "OTR"], "Select a valid OUM")
    .required("OUM is required"),
  price: Yup.number("Price must be a number")
    .required("Price is required")
    .min(0, "Price must not be a negative value")
    .typeError("Price must be a number"),
  quantity: Yup.number("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must not be a negative value")
    .integer("Quantity must be a whole number")
    .typeError("Quantity must be a number"),
});

export const getProductFormValues = (product = {}) => {
  return {
    sku: product.sku || null,
    name: product.name || null,
    barcode: product.barcode || null,
    description: product.description || null,
    unitOfMeasurement: product.unitOfMeasurement || "default",
    quantity: product.quantity || 0,
    price: product.price || 0,
  };
};
