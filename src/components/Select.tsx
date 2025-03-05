import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Chevron from "../assets/Chevron";
import { cn } from "../lib/utils/cn";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
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
  error,
  disabled = false,
  title = "Select Option",
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(options.find((option) => option.value === value));

  const [isBottomSheetActive, setIsBottomSheetActive] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["30%"], []);

  const placeholderPosition = useRef(
    new Animated.Value(selectedOption ? 1 : 0)
  ).current;

  useEffect(() => {
    const foundOption = options.find((option) => option.value === value);
    setSelectedOption(foundOption);

    Animated.timing(placeholderPosition, {
      toValue: foundOption ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [value, options]);

  const handleToggleDropdown = useCallback(() => {
    if (!disabled) {
      console.log("Opening bottom sheet modal");
      setIsBottomSheetActive(true);
      bottomSheetModalRef.current?.present();
    }
  }, [disabled]);

  const handleCloseSheet = useCallback(() => {
    setIsBottomSheetActive(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSelectOption = useCallback(
    (option: SelectOption) => {
      setSelectedOption(option);
      onChange(option.value);
      setIsBottomSheetActive(false);
      handleCloseSheet();
    },
    [onChange, handleCloseSheet]
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsBottomSheetActive(false);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setIsBottomSheetActive(false);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => {
          setIsBottomSheetActive(false);
        }}
      />
    ),
    []
  );

  const placeholderTop = placeholderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "20%"],
  });

  const placeholderFontSize = placeholderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const selectedValueOpacity = placeholderPosition.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });

  const selectedValueTop = placeholderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "60%"],
  });

  const renderOptionItem = useCallback(
    ({ item, index }: { item: SelectOption; index: number }) => {
      const isSelected = selectedOption?.value === item.value;
      const isLastItem = index === options.length - 1;

      return (
        <TouchableOpacity
          className={cn(
            "py-5",
            !isLastItem &&
              "border-b border-components-default-light dark:border-components-default-dark"
          )}
          onPress={() => handleSelectOption(item)}
          activeOpacity={0.7}
        >
          <Text className="text-base font-semibold text-content-primary-light dark:text-content-primary-dark">
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedOption, handleSelectOption, options.length]
  );

  return (
    <View className="mb-4">
      <TouchableOpacity
        className={cn(
          "flex-row items-center justify-between rounded-2xl h-[50px] px-3 py-2.5 relative",
          isBottomSheetActive
            ? "bg-layout-container-light dark:bg-layout-container-dark border border-primary-base-light dark:border-primary-base-dark"
            : error
            ? "bg-error-op8-light dark:bg-error-op8-dark"
            : "bg-components-default-light dark:bg-components-default-dark",
          disabled &&
            "bg-components-disabled-light dark:bg-components-disabled-dark"
        )}
        onPress={handleToggleDropdown}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Animated.Text
          style={{
            position: "absolute",
            left: 16,
            top: placeholderTop,
            fontSize: placeholderFontSize,
            transform: [{ translateY: -10 }],
            color: "rgba(3, 7, 18, 0.5)",
          }}
        >
          {placeholder}
        </Animated.Text>

        <Animated.Text
          style={{
            position: "absolute",
            left: 16,
            top: selectedValueTop,
            opacity: selectedValueOpacity,
            fontSize: 16,
            transform: [{ translateY: -10 }],
          }}
          className={cn(
            "text-content-primary-light dark:text-content-primary-dark mt-0.5",
            disabled &&
              "text-content-disabled-light dark:text-content-disabled-dark"
          )}
          numberOfLines={1}
        >
          {selectedOption?.label || ""}
        </Animated.Text>

        <View className="flex-1" />
        <View className="ml-2">
          <Chevron />
        </View>
      </TouchableOpacity>

      {error && (
        <Text className="mt-1 text-xs text-error-dark-light dark:text-error-dark-dark">
          {error}
        </Text>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        onDismiss={handleDismiss}
        enablePanDownToClose
        enableDynamicSizing={false}
        enableDismissOnClose
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View className="flex-row items-center justify-between px-[20px] pb-[20px] border-b border-components-default-light dark:border-components-default-dark">
            <Text className="text-xl font-bold text-center text-content-primary-light dark:text-content-primary-dark">
              {title}
            </Text>
            <TouchableOpacity
              onPress={handleCloseSheet}
              className="items-center justify-center"
              activeOpacity={0.7}
            >
              <View className="w-[40px] h-[40px] bg-components-default-light dark:bg-components-default-dark rounded-full items-center justify-center">
                <Text className="text-md font-normal text-content-primary-light dark:text-content-primary-dark ">
                  ✕
                </Text>
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
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
