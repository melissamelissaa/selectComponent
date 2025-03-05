import React from "react";
import { View, Text, Pressable } from "react-native";
import CheckIcon from "../assets/Checked";

export type CheckboxState = "unchecked" | "checked" | "indeterminate";
export type CheckboxVariant = "default" | "error";

export interface CheckboxProps {
  label: string;
  state?: CheckboxState;
  description?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  error?: boolean;
}

export function Checkbox({
  label,
  state = "unchecked",
  description,
  disabled = false,
  onChange,
  error,
}: CheckboxProps) {
  const isChecked = state === "checked";
  const isIndeterminate = state === "indeterminate";

  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!isChecked);
    }
  };

  const boxClassName = `h-6 w-6 rounded-lg mr-3 border-2 justify-center items-center ${
    disabled
      ? "bg-components-disabled-light dark:bg-components-disabled-dark border-content-disabled-light dark:border-content-disabled-dark"
      : isChecked || isIndeterminate
      ? "bg-primary-base-light dark:bg-primary-base-dark border-primary-base-light dark:border-primary-base-dark"
      : error
      ? "bg-error-op8-light dark:bg-error-op8-dark border-error-base-light dark:border-error-base-dark"
      : "bg-components-default-light dark:bg-components-default-dark border-content-secondary-light dark:border-content-secondary-dark"
  }`;

  const labelClassName = `text-base font-medium ${
    disabled
      ? "text-content-disabled-light dark:text-content-disabled-dark"
      : error
      ? "text-error-base-light dark:text-error-base-dark"
      : "text-content-primary-light dark:text-content-primary-dark"
  }`;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`flex-row py-3 ${disabled ? "opacity-70" : ""}`}
      accessibilityRole="checkbox"
    >
      <View className={boxClassName}>
        {isChecked && !isIndeterminate && <CheckIcon />}
        {isIndeterminate && (
          <View className="h-0.5 w-3.5 bg-additional-white-Base" />
        )}
      </View>

      <View className="flex-1">
        <Text className={labelClassName}>{label}</Text>
        {description && (
          <Text className="text-sm text-content-secondary-light dark:text-content-secondary-dark mt-0.5">
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
