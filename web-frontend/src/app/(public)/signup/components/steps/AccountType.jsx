"use client";
import React from "react";
import CardButton from "@/components/button/CardButton";
import { SingleUserIcon, MultiUserIcon } from "@/components/icons/Icons";
import { motion } from "framer-motion";
import { fadeTransitionv1 } from "@/components/motion/transitions";
import { useFormContext } from "react-hook-form";

const AccountType = () => {
  const { formState, setValue, getValues } = useFormContext();
  const accountType = getValues("accountType");
  const { errors } = formState;
  const error = errors?.accountType;
  return (
    <motion.div className="w-full h-full flex flex-col gap-10" {...fadeTransitionv1}>
      <div className="w-full flex flex-col items-start justify-center gap-2 ">
        <span className="text-body-lg font-semibold">Account Type</span>
        <span className="text-body-sm">Select your account type</span>
      </div>
      <div className="flex-1 w-full overflow-hidden">
        <div className="h-full w-full flex flex-col justify-start items-center gap-6 overflow-auto">
          <CardButton
            onClick={() => setValue("accountType", "individual", { shouldValidate: true })}
            image={<SingleUserIcon width="2em" height="2em" fill="#424242" />}
            name="individual"
            selected={accountType}
          >
            <span className="text-body">Individual</span>
            <p className="text-body-sm text-justify text-gray-500">
              For small businesses that requires only one user
            </p>
          </CardButton>
          <CardButton
            onClick={() => setValue("accountType", "organization", { shouldValidate: true })}
            image={<MultiUserIcon width="2em" height="2em" fill="#424242" />}
            name="organization"
            selected={accountType}
          >
            <span className="text-body">Organization</span>
            <p className="text-body-sm text-justify text-gray-500">
              For medium businesses that will require more than 2 users
            </p>
          </CardButton>
          {error && (
            <div className="w-full bg-red-100 rounded-lg p-4 font-semibold text-red-400">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountType;
