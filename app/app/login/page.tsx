"use client";

import { Button, Form, Input } from "@heroui/react";
import { FormEvent, useState } from "react";

import { title } from "@/components/primitives";
import { login } from "@/lib/serverFunctions";

export default function DocsPage() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  interface FormDataType {
    password: string;
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Clear errors and submit
    setErrors({});
    login(formData);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className={title({ size: "sm", color: "blue" })}>Welcome back</div>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your email";
              }
              if (validationDetails.typeMismatch) {
                return "Please enter a valid email address";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your password";
              }
            }}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
          />

          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              Login
            </Button>
            <Button type="reset" variant="bordered">
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
