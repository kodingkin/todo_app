import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 pt-48 pb-96">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Your&nbsp;</span>
        <span className={title({ color: "violet" })}>todo list&nbsp;</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Sign up and start making every day count
        </div>
      </div>

      <div className="flex gap-3">
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
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.login}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
