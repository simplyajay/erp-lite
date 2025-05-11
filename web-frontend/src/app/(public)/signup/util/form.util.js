import * as Yup from "yup";

export const getInitialValues = (type) => {
  const organization = { name: "", email: "", phone: "" };
  const user = {
    username: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  };

  try {
    switch (type) {
      case "organization":
        return { ...organization, ...user };

      case "individual":
        return { ...user };

      default:
        return {};
    }
  } catch (error) {
    console.error(error);
    return values;
  }
};

export const businessDetails = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  email: Yup.string().email("Enter a valid email address").required("Company email is required"),
  phone: Yup.string()
    .matches(/^\d*$/, "Enter a valid mobile number") // Regex to ensure only digits
    .test("is-min-length", "Mobile Number should be between 10 to 12 digits", (value) => {
      if (!value) return true;
      return value.length >= 10 && value.length <= 12;
    }),
});

export const personalInfo = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  middlename: Yup.string().optional(),
  lastname: Yup.string().required(" Last name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().optional(),
});

export const accountInfo = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(4, "Username must be atleast 4 characters.")
    .max(15, "Username must not exceed 15 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Username must only contain letters and numbers")
    .matches(/[a-zA-Z]/, "Username cannot be all numbers"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be atleast 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  confirmpassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const getValidationSchema = (step) => {
  switch (step) {
    case 2:
      return Yup.object().shape({ organization: businessDetails });
    case 3:
      return Yup.object().shape({ user: personalInfo });
    case 4:
      return Yup.object().shape({ user: accountInfo });
    default:
      return Yup.object().shape({});
  }
};
