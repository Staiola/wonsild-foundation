"use client";

import { useId, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TextFieldProps = ComponentProps<typeof Input> & {
  label: string;
  hint?: string;
  error?: string;
  fieldClassName?: string;
};

export function TextField({ label, hint, error, fieldClassName, id, "aria-describedby": describedBy, ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const description = error || hint;
  return (
    <div className={cn("ef-field", fieldClassName)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input {...props} id={inputId} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={[describedBy, description ? descriptionId : undefined].filter(Boolean).join(" ") || undefined} />
      {description && <p id={descriptionId} className={error ? "ef-field-error" : "ef-field-hint"} role={error ? "alert" : undefined}>{description}</p>}
    </div>
  );
}
