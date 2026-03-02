"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subtitle, title } from "@/components/primitives";

interface Props {
  params: { id: string };
}

export default function SuccessPage({ params }: Props) {
  const { id } =  params;
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(`/list/${id}`);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
      <h1 className={title({ size: "lg", color: "blue" })}>
        Welcome to the club!
      </h1>

      <p className={subtitle()}>
        Redirecting to your list in{" "}
        <span className="font-bold text-blue-600">{countdown}</span> seconds...
      </p>

      <p className="text-sm text-gray-500">
        Not redirected?{" "}
        <a href="/list" className="text-blue-600 underline hover:text-blue-800">
          Click here
        </a>
      </p>
    </div>
  );
}