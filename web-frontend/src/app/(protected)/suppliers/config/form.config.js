import * as Yup from "yup";

export const getSupplierFormConfig = ({ onSubmit, onCancel }) => ({
  fields: [
    { key: "name", type: "text", label: "Company Name" },
    { key: "trn", type: "text", label: "Tax Registration No." },
    {
      key: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Company Description...",
    },
    { key: "website", type: "text", label: "Website" },
    { key: "address.street1", type: "text", label: "Street address 1" },
    { key: "address.street2", type: "text", label: "Street address 2" },
    { key: "address.city", type: "text", label: "City" },
    { key: "address.state", type: "text", label: "State" },
    {
      key: "address.country",
      type: "select",
      label: "Country",
      default: { key: "default", value: "--Select Country--" },
      options: ["United Arab Emirates", "Sudan", "Panama"],
    },
    { key: "address.zip", type: "text", label: "Zip Code" },
    { key: "contact.title", type: "text", label: "Title" },
    { key: "contact.firstname", type: "text", label: "First name" },
    { key: "contact.middlename", type: "text", label: "Middle name" },
    { key: "contact.lastname", type: "text", label: "Last name" },
    { key: "contact.phone", type: "text", label: "Phone No." },
    { key: "contact.email", type: "text", label: "Email" },
    {
      key: "status",
      type: "select",
      label: "Status",
      //default: { key: "active", value: "Active" },
      options: [
        { key: "active", value: "Active" },
        { key: "inactive", value: "Inactive" },
      ],
    },
    {
      key: "note",
      type: "textarea",
      label: "Note",
      placeholder: "Note...",
    },
    { key: "creditlimit", type: "text", label: "Credit Limit" },
    { key: "openbalance", type: "text", label: "Open Balance", disabled: true },
    { key: "totaloverdue", type: "text", label: "Total Overdue", disabled: true },
  ],
  layout: [
    [{ key: "name" }, { key: "trn" }, { key: "status" }],
    [{ key: "note" }, { key: "description" }, { key: "website" }],
    [{ key: "address.street1" }, { key: "address.street2" }, { key: "address.city" }],
    [{ key: "address.state" }, { key: "address.country" }, { key: "address.zip" }],
    [{ key: "contact.firstname" }, { key: "contact.middlename" }, { key: "contact.lastname" }],
    [{ key: "contact.title" }, { key: "contact.email" }, { key: "contact.phone" }],
    [{ key: "creditlimit" }, { key: "openbalance" }, { key: "totaloverdue" }],
  ],
  buttons: {
    submit: { placeholder: "Save", fn: onSubmit },
    cancel: { placeholder: "Cancel", fn: onCancel },
  },
});

export const getEntityFormValues = (entity = {}) => {
  // ALWAYS DEFINE 'default' AS DEFAULT VALUE FOR A FIELD INTENDED TO BE A SELECT TAG

  return {
    name: entity.name || null,
    trn: entity.trn || null,
    description: entity.description || null,
    note: entity.note || null,
    website: entity.website || null,
    address: {
      street1: entity.address?.street1 || null,
      street2: entity.address?.street2 || null,
      country: entity.address?.country || "default",
      state: entity.address?.state || null,
      city: entity.address?.city || null,
      zip: entity.address?.zip || null,
    },
    contact: {
      title: entity.contact?.title || null,
      firstname: entity.contact?.firstname || null,
      middlename: entity.contact?.middlename || null,
      lastname: entity.contact?.lastname || null,
      phone: entity.contact?.phone || null,
      email: entity.contact?.email || null,
    },
    creditlimit: entity.creditlimit || 0,
    status: entity.status || "active",
  };
};

export const BusinessEntitySchema = Yup.object({
  name: Yup.string().nullable().required("Company name is required"),
  trn: Yup.string().nullable().required("TRN is required"),
  description: Yup.string().nullable(),
  note: Yup.string().nullable(),
  website: Yup.string().nullable(),
  address: Yup.object().shape({
    street1: Yup.string().nullable(),
    street2: Yup.string().nullable(),
    city: Yup.string().nullable().required("This Field is required"),
    state: Yup.string().nullable().required("This Field is required"),
    country: Yup.string().notOneOf(["default"], "Select a valid country"),
    zip: Yup.string().required("Zip Code is required"),
  }),
  contact: Yup.object().shape({
    title: Yup.string().nullable(),
    firstname: Yup.string().nullable(),
    middlename: Yup.string().nullable(),
    lastname: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    email: Yup.string().nullable().required("Email address is required"),
  }),
  creditlimit: Yup.number("Should be a valid number").default(0),
  status: Yup.string().oneOf(["active", "inactive"], "Invalid Status"),
});
