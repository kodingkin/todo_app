"use client";

import { Input } from "@heroui/react";
import { ValidationResult } from "@react-types/shared";
import { ReactNode } from "react";

type Props = {
  label: "Name" | "Email" | "Password";
  placeholder: string;
  errorMessage: (v: ValidationResult) => ReactNode;
};

const CustomizedInput = (props: Props) => {
  return (
    <Input
      isRequired
      errorMessage={props.errorMessage}
      label={props.label}
      labelPlacement="outside"
      minLength={props.label === "Password" ? 8 : undefined}
      name={props.label.toLowerCase()}
      placeholder={props.placeholder}
      type={props.label.toLowerCase()}
    />
  );
};

export default CustomizedInput;
