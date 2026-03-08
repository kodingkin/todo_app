import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";

const SingupButton = () => {
  return (
    <Link
      className={buttonStyles({
        color: "primary",
        radius: "full",
        variant: "shadow",
      })}
      href={siteConfig.links.signUp}
    >
      Sign Up
    </Link>
  );
};

export default SingupButton;
