import * as Yup from "yup";

export const getInitialValues = (type) => ({
  organization: type === "organization" ? { name: "", email: "", phone: "" } : undefined,
  user: {
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  },
});

export const organizationSchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  email: Yup.string().email("Enter a valid email address").required("Company email is required"),
  phone: Yup.string()
    .matches(/^\d*$/, "Enter a valid mobile number") // Regex to ensure only digits
    .test("is-min-length", "Mobile Number should be between 10 to 12 digits", (value) => {
      if (!value) return true;
      return value.length >= 10 && value.length <= 12;
    }),
});

export const detailSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  middlename: Yup.string().optional(),
  lastname: Yup.string().required(" Last name is required"),
});

export const usernameSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(4, "Username should be atleast 4 characters.")
    .matches(/^[a-zA-Z0-9]*$/, "Username should only contain letters and numbers")
    .matches(/[a-zA-Z]/, "Username cannot be all numbers"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().optional(),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be atleast 8 characters"),
  confirmpassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const getValidationSchema = (step) => {
  switch (step) {
    case 1:
      return Yup.object().shape({ organization: organizationSchema });
    case 2:
      return Yup.object().shape({ user: detailSchema });
    case 3:
      return Yup.object().shape({ user: usernameSchema });
    case 4:
      return Yup.object().shape({ user: passwordSchema });
    default:
      return {};
  }
};
