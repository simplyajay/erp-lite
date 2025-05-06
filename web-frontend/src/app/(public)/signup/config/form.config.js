export const getFormConfig = ({ step, onSubmit, onCancel }) => {
  let formConfig = {
    buttons: {
      submit: { placeholder: "Next", fn: onSubmit },
      cancel: {
        placeholder: "Back",
        fn: (context) => {
          const values = context?.getValues?.();
          onCancel?.(values);
        },
      },
    },
  };

  let detailsConfig = {
    organization: {
      name: { value: "Company Name" },
      email: { value: "Email" },
      phone: { value: "Phone", format: (text) => text },
    },
    user: {
      firstname: { value: "First Name" },
      middlename: { value: "Middle Name" },
      lastname: { value: "Last Name" },
      username: { value: "Username" },
      email: { value: "Email" },
      phone: { value: "Phone", format: (text) => text },
    },
  };
  try {
    switch (step) {
      case 1:
        formConfig.title = "Organization Details";
        formConfig.fields = [
          { key: "organization.name", type: "text", placeholder: "Company Name" },
          { key: "organization.email", type: "text", placeholder: "Company Email" },
          { key: "organization.phone", type: "text", placeholder: "Company Phone (Optional)" },
        ];
        formConfig.layout = [
          [{ key: "organization.name" }],
          [{ key: "organization.email" }],
          [{ key: "organization.phone" }],
        ];
        break;

      case 2:
        formConfig.title = "User Information";
        formConfig.fields = [
          { key: "user.firstname", type: "text", placeholder: "First Name" },
          { key: "user.middlename", type: "text", placeholder: "Middle Name (Optional)" },
          { key: "user.lastname", type: "text", placeholder: "Last Name" },
        ];
        formConfig.layout = [
          [{ key: "user.firstname" }],
          [{ key: "user.middlename" }],
          [{ key: "user.lastname" }],
        ];
        break;

      case 3:
        formConfig.title = "Account Details";
        formConfig.fields = [
          { key: "user.username", type: "text", placeholder: "Username" },
          { key: "user.email", type: "text", placeholder: "Email" },
          { key: "user.phone", type: "text", placeholder: "Phone (Optional)" },
        ];
        formConfig.layout = [
          [{ key: "user.username" }],
          [{ key: "user.email" }],
          [{ key: "user.phone" }],
        ];
        break;

      case 4:
        formConfig.title = "Password & Security";
        formConfig.fields = [
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
        formConfig.layout = [[{ key: "user.password" }], [{ key: "user.confirmpassword" }]];
        break;

      default:
        break;
    }

    return { formConfig, detailsConfig };
  } catch (error) {
    console.error(error);
  }
};
