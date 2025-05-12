import { motion, AnimatePresence } from "framer-motion";

const LoadingBar = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-[5px] z-50 overflow-hidden rounded-t-md">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-"
            initial={{ x: "-100%" }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2],
            }}
            transition={{
              x: {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
              opacity: {
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingBar;
