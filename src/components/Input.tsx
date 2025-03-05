import React, { useState, useEffect, useRef } from "react";
import { TextInput, Animated, Easing, Pressable } from "react-native";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function Input({ label, value, onChangeText }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelTop = labelPosition.interpolate({
    inputRange: [0, 2],
    outputRange: [18, 0],
  });

  const labelFontSize = labelPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const labelOpacity = labelPosition.interpolate({
    inputRange: [0, 5],
    outputRange: [0.6, 1],
  });

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className="h-14 px-4 py-8 relative bg-components-default-light dark:bg-components-default-dark rounded-2xl"
    >
      <Animated.Text
        style={[
          {
            top: labelTop,
            fontSize: labelFontSize,
            opacity: labelOpacity,
          },
        ]}
        className="absolute left-5 text-content-primary-light dark:text-content-primary-dark"
      >
        {label}
      </Animated.Text>

      <TextInput
        ref={inputRef}
        className="absolute left-5 right-4 bottom-3 h-6 text-[16px] font-normal p-0 text-content-primary-light dark:text-content-primary-dark"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Pressable>
  );
}
