import React from "react";

const CardButton = ({ children, image, onClick, className, name, selected }) => {
  const [title, description] = children;
  return (
    <div
      className={`w-full flex gap-6 p-4 hover:cursor-pointer rounded-lg border  hover:border-blue-300 transition-colors ${className} ${
        selected === name ? "border-[2px] border-blue-400 hover:border-blue-400" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      {image && (
        <div className="flex justify-center items-center">
          <i>{image}</i>
        </div>
      )}

      <div className="flex-1 gap-2 flex flex-col justify-start items-start">
        <div className="w-full flex justify-between">
          <h2 className="font-semibold">{title}</h2>
        </div>
        <div className="w-full flex-wrap text-sm line-clamp-2 sm:line-clamp-none">
          {description}
        </div>
      </div>
    </div>
  );
};

export default CardButton;
