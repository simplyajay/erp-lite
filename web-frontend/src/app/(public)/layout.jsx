import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <div id="root-public" className="w-full h-full flex flex-col overflow-auto">
      <nav className="w-full max-h-14 p-2 flex justify-center items-center border-b border-gray-300 nav-public">
        this is a header
      </nav>
      <div className="flex-1 w-full">{children}</div>
      <footer className="w-full max-h-14 p-2 flex justify-center items-center border-t border-gray-300">
        this is a footer
      </footer>
    </div>
  );
};

export default PublicLayout;
