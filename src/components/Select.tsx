import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import Chevron from "../assets/Chevron";
import { cn } from "../lib/utils/cn";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  title?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  title = "Select Option",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(options.find((option) => option.value === value));
  const { height: windowHeight } = Dimensions.get("window");

  const placeholderPosition = useRef(
    new Animated.Value(selectedOption ? 1 : 0)
  ).current;

  useEffect(() => {
    const foundOption = options.find((option) => option.value === value);
    setSelectedOption(foundOption);

    // Animate when selection changes
    Animated.timing(placeholderPosition, {
      toValue: foundOption ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, options]);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectOption = (option: SelectOption) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  // Animation interpolations
  const placeholderTop = placeholderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "25%"],
  });

  const placeholderFontSize = placeholderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const selectedValueOpacity = placeholderPosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const selectedValueTop = placeholderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "60%"],
  });

  const renderOptionItem = ({ item }: { item: SelectOption }) => {
    const isSelected = selectedOption?.value === item.value;

    return (
      <TouchableOpacity
        className="py-5 border-b border-grayscale-op-16"
        onPress={() => handleSelectOption(item)}
        activeOpacity={0.7}
      >
        <Text className="text-base font-semibold text-primary">
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-1 text-sm font-medium text-grayscale-dark">
          {label}
        </Text>
      )}

      <TouchableOpacity
        className={cn(
          "flex-row items-center justify-between rounded-2xl h-[50px] px-3 py-2.5 relative",
          isOpen
            ? "bg-layout-container border border-primary-base"
            : error
            ? "bg-error-op-8"
            : "bg-component-primary",
          disabled && "bg-component-disabled"
        )}
        onPress={handleToggleDropdown}
        activeOpacity={disabled ? 1 : 0.7}
        style={{
          shadowColor: "rgba(5, 6, 15, 0.16)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 15,
        }}
      >
        {/* Animated placeholder */}
        <Animated.Text
          style={{
            position: "absolute",
            left: 12,
            top: placeholderTop,
            fontSize: placeholderFontSize,
            transform: [{ translateY: -10 }],
            color: selectedOption
              ? "#6B7280"
              : disabled
              ? "#A1A1AA"
              : "#9CA3AF",
          }}
        >
          {placeholder}
        </Animated.Text>

        {/* Animated selected value */}
        <Animated.Text
          style={{
            position: "absolute",
            left: 12,
            top: selectedValueTop,
            opacity: selectedValueOpacity,
            fontSize: 16,
            transform: [{ translateY: -10 }],
          }}
          className={cn("text-primary mt-0.5", disabled && "text-disabled")}
          numberOfLines={1}
        >
          {selectedOption?.label || ""}
        </Animated.Text>

        <View className="flex-1" />
        <View className="ml-2">
          <Chevron />
        </View>
      </TouchableOpacity>

      {error && <Text className="mt-1 text-xs text-error-base">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex-1 bg-black-base-op-50">
            <View
              className={cn(
                "absolute w-full bg-white-base rounded-t-2xl shadow-lg bottom-0 left-0 right-0",
                Platform.OS === "ios" && "shadow-black"
              )}
              style={{ height: windowHeight * 0.3 }}
            >
              <View className="flex-row items-center justify-between p-[20px] border-b border-grayscale-op-16">
                <Text className="text-xl font-bold text-center text-primary">
                  {title}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsOpen(false)}
                  className="items-center justify-center"
                  activeOpacity={0.7}
                >
                  <View className="w-[40px] h-[40px] bg-component-primary rounded-full items-center justify-center">
                    <Text className="text-primary text-md font-normal">✕</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <FlatList
                data={options}
                renderItem={renderOptionItem}
                keyExtractor={(item) => item.value.toString()}
                showsVerticalScrollIndicator={false}
                className="px-[20px]"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default Select;
