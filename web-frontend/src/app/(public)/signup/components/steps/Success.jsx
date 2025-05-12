import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HomeIconSolid, CheckIcon, LogInIcon } from "@/components/icons/Icons";
import { fadeTransitionv1 } from "@/components/motion/transitions";

const Success = () => {
  return (
    <motion.div className="w-full h-full flex flex-col items-center" {...fadeTransitionv1}>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="h-20 w-20 text-5xl flex items-center justify-center p-2 rounded-full border-4 border-green-400 text-green-400 ">
          <CheckIcon />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-extrabold">Registration Sucessful</h1>
          <p className="font-body-sm text-gray-500">You have successfully created your account!</p>
        </div>

        <div className="w-full flex justify-center gap-6">
          <Link href={"/login"} className="btn btn-primary-solid text-lg text-gray-600">
            <i>
              <LogInIcon />
            </i>
            <span>Login</span>
          </Link>
          <Link href={"/"} className="btn btn-secondary-solid text-lg text-gray-600">
            <i>
              <HomeIconSolid />
            </i>
            <span>Home</span>
          </Link>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2 text-sm text-gray-500 font-semibold">
          <p>A confirmation email has been sent to your email address.</p>
          <p>Please check your inbox and follow the instructions to verify your account.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Success;
