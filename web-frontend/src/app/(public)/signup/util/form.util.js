import * as Yup from "yup";

export const getDefaultValues = () => {
  const user = {
    username: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  };
  const organization = {
    name: "",
    email: "",
    phone: "",
  };

  return { user, organization };
};

export const validationMap = {
  2: {
    entity: "organization",
    fields: ["organization.email", "organization.name", "organization.phone"],
  },
  3: {
    entity: "user",
    fields: ["user.firstname", "user.middlename", "user.lastname", "user.phone", "user.email"],
  },
  4: {
    entity: "user",
    fields: ["user.username", "user.password"],
  },
};

export const getPasswordValidationStatus = (password) => {
  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  if (!isMinLength || !hasNumber) return { tier: 1, label: "Weak" };
  if (isMinLength && hasNumber && !hasUppercase && !hasSpecialChar)
    return { tier: 2, label: "Fair" };
  if (hasUppercase && !hasSpecialChar) return { tier: 3, label: "Good" };
  if (hasUppercase && hasSpecialChar) return { tier: 4, label: "Strong" };

  return { tier: 2, label: "Fair" };
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
    .test(
      "conditional",
      "Password must include at least one: uppercase letter, number, or symbol.",
      (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
        const conditionsMet = [hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;

        if (conditionsMet === 1) {
          // Fair: At least 1 condition
          return true; // Fair
        } else if (conditionsMet === 2) {
          // Good
          return true;
        } else if (conditionsMet === 3) {
          // Strong
          return true;
        } else return false;
      }
    ),
  confirmpassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const accountType = Yup.object().shape({
  accountType: Yup.string().required("Please select an account type."),
});

export const getValidationSchema = (step) => {
  switch (step) {
    case 1:
      return accountType;
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
