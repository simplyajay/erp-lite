import { useCallback } from "react";
import { ClipLoader } from "react-spinners";

export const useFormHandler = ({ register, errors, clearErrors, loading }) => {
  const formInputClass =
    "p-3 min-h-10 w-full rounded-sm focus:ring-2 focus:ring-blue-100 focus:outline-none border border-gray-200 text-sm md:text-sm lg:text-sm";

  //handles instances where name has a dot in it.
  //if name has a dot, it indicates that that field is an object e.g. address.city
  const get = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const renderInput = useCallback(
    (input, key) => {
      const props = {
        ...register(input.key),
        id: input.key,
        name: input.key,
        className: `${formInputClass} ${get(errors, input.key) ? "ring-2 ring-red-200" : ""}`,
        disabled: input.disabled || loading,
        onFocus: () => clearErrors(input.key),
      };

      let customComponent = <></>;

      if (input.customInput) {
        customComponent = input.customInput(input, props);
      } else {
        try {
          switch (input.type) {
            case "select":
              customComponent = (
                <select {...props} autoComplete="off">
                  {input.default && (
                    <option value="default">
                      {input.default.value ? input.default.value : "-- Select --"}
                    </option>
                  )}

                  {input.options.map((option, index) => (
                    <option key={index} value={option.key ? option.key : option} className="p-3">
                      {option.value ? option.value : option}
                    </option>
                  ))}
                </select>
              );
              break;
            case "textarea":
              customComponent = (
                <textarea
                  {...props}
                  autoComplete="off"
                  placeholder={input.placeholder || undefined}
                ></textarea>
              );
              break;
            default:
              customComponent = (
                <input {...props} autoComplete="off" placeholder={input.placeholder || undefined} />
              );
              break;
          }
        } catch (error) {
          console.error("Error, ", error);
        }
      }

      return (
        <div key={key} className="w-full flex flex-col gap-1">
          {input.label && (
            <label className="text-sm" htmlFor={input.key}>
              {input.label}
            </label>
          )}
          {customComponent}
          {get(errors, input.key) && (
            <p className="text-red-500 text-sm">{get(errors, `${input.key}.message`)}</p>
          )}
        </div>
      );
    },
    [register, errors, clearErrors, loading]
  );

  const renderButtons = useCallback(
    (buttons) => {
      return (
        <>
          <button
            type="button"
            disabled={loading}
            className="w-[70px] flex justify-center items-center p-2 border rounded-sm hover:cursor-pointer"
            onClick={buttons?.cancel?.fn}
          >
            {buttons?.cancel?.placeholder ? buttons.cancel.placeholder : "Cancel"}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-[70px] flex justify-center items-center p-2 border rounded-sm hover:cursor-pointer"
          >
            {loading ? (
              <ClipLoader color="#007d96" size={15} loading={loading} />
            ) : buttons?.submit?.placeholder ? (
              buttons.submit.placeholder
            ) : (
              "Submit"
            )}
          </button>
        </>
      );
    },
    [loading]
  );

  return { renderInput, renderButtons };
};
