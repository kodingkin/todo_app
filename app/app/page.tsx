import * as motion from "motion/react-client";
import { AnimationGeneratorType, Variants } from "motion";

import { title, subtitle } from "@/components/primitives";
import SingupButton from "@/components/signupButton";
import LoginButton from "@/components/logingButton";
import ButtonAnimationWrapper from "@/components/animateButton";

const containerVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      type: "spring" as AnimationGeneratorType,
      stiffness: 200,
      damping: 7,
      delayChildren: 1.7,
      staggerChildren: 0.3,
    },
  },
} as Variants;

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring" as AnimationGeneratorType,
      stiffness: 300,
      damping: 20,
    },
  },
  whileHover: { scale: 2, y: -2 },
  whileTap: { scale: 0.98, y: 1 },
} as Variants;

export default function Home() {
  return (
    <motion.div
      animate="visible"
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 pt-48 pb-96"
      initial="hidden"
      variants={containerVariants}
    >
      <motion.div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Your&nbsp;</span>
        <span className={title({ color: "violet" })}>todo list&nbsp;</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Sign up and start making every day count
        </div>
      </motion.div>

      <motion.div className="flex gap-3">
        <motion.div variants={buttonVariants}>
          <ButtonAnimationWrapper>
            <SingupButton />
          </ButtonAnimationWrapper>
        </motion.div>
        <motion.div variants={buttonVariants}>
          <ButtonAnimationWrapper>
            <LoginButton />
          </ButtonAnimationWrapper>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
