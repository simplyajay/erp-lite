import React from "react";
import Link from "next/link";
import RegistrationForm from "./components/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="main-container flex items-center justify-center overflow-auto scrollbar-thin">
      <div className="h-full w-[500px] flex flex-col justify-center items-center gap-4">
        <RegistrationForm />
        <div className="w-full flex items-center">
          <div className="text-body-sm flex gap-1">
            <span className="text-body-sm">Already have an account?</span>
            <Link href={"/login"} className="font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
