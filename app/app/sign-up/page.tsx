"use client";

import { Button, Form, Checkbox, Link } from "@heroui/react";
import { FormEvent, useState } from "react";

import { title } from "@/components/primitives";
import { createUser, FormDataType } from "@/lib/serverFunctions";
import CustomizedInput from "@/components/input";

export default function DocsPage() {
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  const formChecking = (data: FormDataType) => {
    const newErrors: Partial<Record<keyof FormDataType, string>> = {};

    if (data.terms !== "true") {
      newErrors.terms = "Please accept the terms";
    }

    return newErrors;
  };

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
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">
          <CustomizedInput
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your name";
              }

              return errors.name;
            }}
            label="Name"
            placeholder="Enter your name"
          />

          <CustomizedInput
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your email";
              }
              if (validationDetails.typeMismatch) {
                return "Please enter a valid email address";
              }
            }}
            label="Email"
            placeholder="Enter your email"
          />

          <CustomizedInput
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
            placeholder="Enter your password"
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
