import * as motion from "motion/react-client";
import { ReactNode } from "react";

const ButtonAnimationWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98, y: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default ButtonAnimationWrapper;
