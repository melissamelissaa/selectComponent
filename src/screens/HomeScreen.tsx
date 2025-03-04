import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Select from "../components/Select";

const sexOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const HomeScreen = () => {
  const [name, setName] = useState("Charlie Saris");
  const [position, setPosition] = useState("Product Designer");
  const [sex, setSex] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = () => {
    if (!sex) {
      setValidationError("Please select your sex");
      return;
    }

    setValidationError("");
    Alert.alert(
      "Profile Updated",
      `Sex: ${
        sexOptions.find((option) => option.value === sex)?.label || "None"
      }`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-layout-container-light dark:bg-layout-container-dark">
      <ScrollView className="flex-1 p-5">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-content-primary-light dark:text-content-primary-dark mb-4">
            Profile Info
          </Text>
        </View>
        <View className="flex-1 gap-5">
          <View className="bg-components-default-light dark:bg-components-default-dark px-5 py-2.5 rounded-2xl">
            <View className="flex gap-1 flex-col">
              <Text className="text-sm text-content-secondary-light dark:text-content-secondary-dark">
                Full name
              </Text>
              <TextInput
                className="text-content-primary-light dark:text-content-primary-dark text-base p-0 m-0 h-6 leading-none"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          <View className="bg-components-default-light dark:bg-components-default-dark px-5 py-2.5 rounded-2xl">
            <View className="flex flex-col gap-1">
              <Text className="text-sm text-content-secondary-light dark:text-content-secondary-dark">
                Position
              </Text>
              <TextInput
                className="text-content-primary-light dark:text-content-primary-dark text-base p-0 m-0 h-6 leading-none"
                value={position}
                onChangeText={setPosition}
              />
            </View>
          </View>

          <Select
            options={sexOptions}
            value={sex}
            onChange={setSex}
            placeholder="Sex"
            error={validationError}
          />
        </View>
        <View className="mt-8">
          <TouchableOpacity
            className="bg-primary-base-light dark:bg-primary-base-dark py-5 rounded-2xl"
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text className="text-additional-white-Base text-center font-medium">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
