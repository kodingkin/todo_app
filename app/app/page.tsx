import { title, subtitle } from "@/components/primitives";
import SingupButton from "@/components/signupButton";
import LoginButton from "@/components/logingButton";

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
        <SingupButton />
        <LoginButton />
      </div>
    </div>
  );
}
