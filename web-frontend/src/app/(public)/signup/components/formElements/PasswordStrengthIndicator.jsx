import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPasswordStrength, strengthLevels } from "./util/password.utils";

const PasswordStrengthIndicator = ({ password, showIndicator }) => {
  if (!password) return;

  const strengthTier = getPasswordStrength(password || "");

  const { label, color, percentage } = strengthLevels[strengthTier];

  return (
    <AnimatePresence>
      <motion.div
        key="password-strength"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showIndicator ? "auto" : 0,
          opacity: showIndicator ? 1 : 0,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full flex flex-col gap-1"
      >
        <div className="w-full flex justify-between text-sm font-semibold">
          <span className=" !text-gray-700">Password strength</span>
          <span style={{ color }} className="font-semi-bold">
            {label}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{
              background: color,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PasswordStrengthIndicator;
