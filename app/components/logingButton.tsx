import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";

const LoginButton = () => {
  return (
    <Link
      className={buttonStyles({ variant: "bordered", radius: "full" })}
      href={siteConfig.links.login}
    >
      Login
    </Link>
  );
};

export default LoginButton;
