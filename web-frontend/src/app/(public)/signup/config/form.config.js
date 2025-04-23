export const getFormConfig = ({ step, onSubmit, onCancel }) => {
  let config = {
    title: "Account Type",
    buttons: {
      submit: { placeholder: step < 5 ? "Next" : "Confirm", fn: onSubmit },
      cancel: { placeholder: "Back", fn: onCancel },
    },
  };
  try {
    switch (step) {
      case 1:
        config.title = "Organization Details";
        config.fields = [
          { key: "organization.name", type: "text", placeholder: "Company Name" },
          { key: "organization.email", type: "text", placeholder: "Company Email" },
          { key: "organization.phone", type: "text", placeholder: "Company Phone (Optional)" },
        ];
        config.layout = [
          [{ key: "organization.name" }],
          [{ key: "organization.email" }],
          [{ key: "organization.phone" }],
        ];
        break;

      case 2:
        config.title = "Account Details";
        config.fields = [
          { key: "user.firstname", type: "text", placeholder: "First Name" },
          { key: "user.middlename", type: "text", placeholder: "Middle Name (Optional)" },
          { key: "user.lastname", type: "text", placeholder: "Last Name" },
        ];
        config.layout = [
          [{ key: "user.firstname" }],
          [{ key: "user.middlename" }],
          [{ key: "user.lastname" }],
        ];
        break;

      case 3:
        config.title = "Account Details";
        config.fields = [
          { key: "user.username", type: "text", placeholder: "Username" },
          { key: "user.email", type: "text", placeholder: "Email" },
          { key: "user.phone", type: "text", placeholder: "Phone (Optional)" },
        ];
        config.layout = [
          [{ key: "user.username" }],
          [{ key: "user.email" }],
          [{ key: "user.phone" }],
        ];
        break;

      case 4:
        config.title = "Password & Security";
        config.fields = [
          {
            key: "user.password",
            type: "text",
            placeholder: "Password",
          },
          {
            key: "user.confirmpassword",
            type: "text",
            placeholder: "Confirm Password",
          },
        ];
        config.layout = [[{ key: "user.password" }], [{ key: "user.confirmpassword" }]];
        break;

      default:
        break;
    }

    return config;
  } catch (error) {
    console.error(error);
  }
};
