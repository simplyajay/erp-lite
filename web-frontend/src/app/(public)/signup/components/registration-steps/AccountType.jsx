import React from "react";
import CardButton from "@/components/button/CardButton";
import { SingleUserIcon, MultiUserIcon } from "@/components/icons/Icons";

const AccountType = ({ setSelected, selected, onButtonClick }) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center gap-8">
      <div className="flex-1 w-full flex flex-col justify-center items-center gap-4">
        <CardButton
          onClick={() => setSelected("individual")}
          image={<SingleUserIcon width="2em" height="2em" fill="#424242" />}
          name="individual"
          value="individual"
          selected={selected}
        >
          <h1 className="text-responsive-md">Individual</h1>
          <p className="text-sm md:text-sm lg:text-sm text-justify text-gray-500">
            For small businesses that requires only one user
          </p>
        </CardButton>
        <CardButton
          onClick={() => setSelected("organization")}
          image={<MultiUserIcon width="2em" height="2em" fill="#424242" />}
          name="organization"
          value="organization"
          selected={selected}
        >
          <h1 className="text-responsive-md">Organization</h1>
          <p className="text-sm md:text-sm lg:text-sm text-justify text-gray-500">
            For medium businesses that will require more than 2 users
          </p>
        </CardButton>
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <button
          disabled={selected ? false : true}
          onClick={onButtonClick}
          className="p-2 hover:cursor-pointer rounded-sm border disabled:border-gray-300 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountType;
