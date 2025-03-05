import React from "react";
import { View, Text, Pressable } from "react-native";
import CheckIcon from "../assets/Checked";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
  indeterminate?: boolean;
  variant?: "default" | "error" | "disabled";
}

export function Checkbox({
  label,
  checked,
  onToggle,
  disabled = false,
  description,
  indeterminate = false,
  variant = "default",
}: CheckboxProps) {
  const handlePress = () => {
    if (!disabled) {
      onToggle(!checked);
    }
  };

  const getCheckboxStyle = () => {
    if (disabled) {
      return "bg-components-disabled-light dark:bg-components-disabled-dark border-content-disabled-light dark:border-content-disabled-dark";
    }

    if (variant === "error") {
      return "bg-error-op8-light dark:bg-error-op8-dark border-error-base-light dark:border-error-base-dark";
    }

    if (checked || indeterminate) {
      return "bg-primary-base-light dark:bg-primary-base-dark border-primary-base-light dark:border-primary-base-dark";
    }

    return "bg-components-default-light dark:bg-components-default-dark border-content-secondary-light dark:border-content-secondary-dark";
  };

  const getLabelStyle = () => {
    if (disabled) {
      return "text-content-disabled-light dark:text-content-disabled-dark";
    }

    if (variant === "error") {
      return "text-error-base-light dark:text-error-base-dark";
    }

    return "text-content-primary-light dark:text-content-primary-dark";
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`flex-row py-3 ${disabled ? "opacity-70" : ""}`}
      disabled={disabled}
    >
      <View
        className={`h-6 w-6 rounded-lg mr-3 border-2 justify-center items-center ${getCheckboxStyle()}`}
      >
        {checked && !indeterminate && <CheckIcon />}
        {indeterminate && (
          <View className="h-0.5 w-3.5 bg-additional-white-Base" />
        )}
      </View>
      <View className="flex-1">
        <Text className={`text-base font-medium ${getLabelStyle()}`}>
          {label}
        </Text>
        {description && (
          <Text className="text-sm text-content-secondary-light dark:text-content-secondary-dark mt-0.5">
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
