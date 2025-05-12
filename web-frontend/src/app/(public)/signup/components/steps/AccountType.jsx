import React from "react";
import CardButton from "@/components/button/CardButton";
import { SingleUserIcon, MultiUserIcon } from "@/components/icons/Icons";
import { motion } from "framer-motion";
import { fadeTransitionv1 } from "@/components/motion/transitions";

const AccountType = ({ selected, setSelected }) => {
  return (
    <motion.div className="w-full h-full flex flex-col gap-10" {...fadeTransitionv1}>
      <div className="w-full flex flex-col items-start justify-center gap-2 ">
        <span className="text-body-lg font-semibold">Account Type</span>
        <span className="text-body-sm">Select your account type</span>
      </div>
      <div className="flex-1 w-full overflow-hidden">
        <div className="h-full w-full flex flex-col justify-start items-center gap-6 overflow-auto">
          <CardButton
            onClick={() => setSelected("individual")}
            image={<SingleUserIcon width="2em" height="2em" fill="#424242" />}
            name="individual"
            selected={selected}
          >
            <span className="text-body">Individual</span>
            <p className="text-body-sm text-justify text-gray-500">
              For small businesses that requires only one user
            </p>
          </CardButton>
          <CardButton
            onClick={() => setSelected("organization")}
            image={<MultiUserIcon width="2em" height="2em" fill="#424242" />}
            name="organization"
            selected={selected}
          >
            <span className="text-body">Organization</span>
            <p className="text-body-sm text-justify text-gray-500">
              For medium businesses that will require more than 2 users
            </p>
          </CardButton>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountType;
