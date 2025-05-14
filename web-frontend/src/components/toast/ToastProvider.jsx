import { toast, Bounce } from "react-toastify";

const defaultToastConfig = {
  type: "success",
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
  className: "text-sm !w-fit",
};

export const notify = (message, config = {}, toastIdRef) => {
  const mergedConfig = { ...defaultToastConfig, ...config };

  const onToastClose = () => {
    if (toastIdRef) {
      toastIdRef.current = null;
    }
  };

  if (toastIdRef && toastIdRef.current) {
    toast.update(toastIdRef.current, {
      render: message,
      ...mergedConfig,
      onClose: onToastClose,
    });
  } else {
    if (toastIdRef) {
      toastIdRef.current = toast(message, { ...mergedConfig, onClose: onToastClose });
    } else {
      toast(message, { ...mergedConfig, onClose: onToastClose });
    }
  }
};
