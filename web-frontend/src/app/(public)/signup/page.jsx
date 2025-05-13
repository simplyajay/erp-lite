import React from "react";
import Link from "next/link";
import RegistrationForm from "./components/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="main-container flex items-start justify-center">
      <div className="w-[700px] flex flex-col justify-start items-center gap-4">
        <RegistrationForm />
        <div className="w-full flex items-center">
          <div className="text-body-sm flex gap-1">
            <span className="text-body-sm">Already have an account?</span>
            <Link href={"/login"} className="font-bold btn-primary-transparent">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
