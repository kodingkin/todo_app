"use client"

import { title } from "@/components/primitives";
import { Button,Form, Input, Select, SelectItem, Checkbox} from "@heroui/react";
import { FormEvent, useState } from "react";

export default function DocsPage() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormDataType, string>>>({});

  // Real-time password validation
  const getPasswordError = (value: string) => {
    if (!value) return null;
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }

    return null;
  };

  interface FormDataType {
    password: string;
  }

const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const getString = (key: string): string => {
      const value = formData.get(key);
      return typeof value === "string" ? value : "";
    };

    const data: FormDataType = {
      password: getString("password"),
    };

    // Custom validation checks
    const newErrors: Partial<Record<keyof FormDataType, string>> = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className={title({size: "sm"})}>Welcome back</div>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">

          <Input
            isRequired
            errorMessage={({validationDetails}) => {
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
            errorMessage={getPasswordError(password)}
            isInvalid={getPasswordError(password) !== null}
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

        {submitted && (
          <div className="text-small text-default-500 mt-4">
            Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        )}
      </Form>
    </div>
  );
}
