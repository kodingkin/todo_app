"use client";

import { Button, Form, Input, Checkbox, Link } from "@heroui/react";
import { FormEvent, useState } from "react";

import { title } from "@/components/primitives";
import { createUser, FormDataType } from "@/lib/serverFunctions";

export default function DocsPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  const formChecking = (data: FormDataType) => {
      const newErrors: Partial<Record<keyof FormDataType, string>> = {};
      if (data.password !== data.confirmPassword) {
        newErrors.confirmPassword = "Seems you enter different password here";
      }
      if (data.terms !== "true") {
        newErrors.terms = "Please accept the terms"
      }
      return newErrors;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const getString = (key: string): string => {
      const value = formData.get(key);

      return typeof value === "string" ? value : "";
    };

    const data: FormDataType = {
      name: getString("name"),
      password: getString("password"),
      confirmPassword: getString("confirmPassword"),
      terms: getString("terms"),
    };

    const newErrors = formChecking(data);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    await createUser(formData);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className={title({ size: "sm", color: "blue" })}>Welcome</div>
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
                return "Please enter your name";
              }

              return errors.name;
            }}
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter your name"
          />

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
              if (validationDetails.tooShort) {
                return "Password must be 8 characters or more";
              }
              return errors.password;
            }}
            label="Password"
            labelPlacement="outside"
            name="password"
            minLength={8}
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
          />

          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your password again";
              }
              return errors.confirmPassword;
            }}
            label="Confirm Password"
            labelPlacement="outside"
            name="confirmPassword"
            placeholder="Enter your password again"
            type="password"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
          />
          <div className="flex gap-1">
            <Checkbox
              isRequired
              classNames={{
                label: "text-small",
              }}
              isInvalid={!!errors.terms}
              name="terms"
              validationBehavior="aria"
              value="true"
              onValueChange={() =>
                setErrors((prev) => ({ ...prev, terms: undefined }))
              }
            >
              <span className="text-default-600">I agree to the </span>
            </Checkbox>
            <Link
              isExternal
              className="flex items-center gap-1 text-small"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              title="Terms and conditions"
            >
              <span className="text-blue-400">terms and conditions</span>
            </Link>
          </div>

          {errors.terms && (
            <span className="text-danger text-small">{errors.terms}</span>
          )}

          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              Sign Up
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
