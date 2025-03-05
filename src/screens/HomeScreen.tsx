import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";

const sexOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [sex, setSex] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [termsError, setTermsError] = useState("");

  useEffect(() => {
    const allChecked = agreeToTerms && agreeToMarketing && agreeToPrivacy;
    const someChecked = agreeToTerms || agreeToMarketing || agreeToPrivacy;

    setSelectAll(allChecked);
    setIsIndeterminate(someChecked && !allChecked);
  }, [agreeToTerms, agreeToMarketing, agreeToPrivacy]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setIsIndeterminate(false);
    setAgreeToTerms(checked);
    setAgreeToMarketing(checked);
    setAgreeToPrivacy(checked);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!sex) {
      setValidationError("Please select your sex");
      hasError = true;
    } else {
      setValidationError("");
    }

    if (!agreeToTerms || !agreeToPrivacy) {
      setTermsError("You must agree to the terms and privacy policy");
      hasError = true;
    } else {
      setTermsError("");
    }

    if (hasError) return;

    Alert.alert(
      "Profile Updated",
      `Name: ${name}\nPosition: ${position}\nSex: ${
        sexOptions.find((option) => option.value === sex)?.label || "None"
      }\nAgreed to Terms: Yes\nAgreed to Privacy: Yes\nAgreed to Marketing: ${
        agreeToMarketing ? "Yes" : "No"
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
          <Input label="Full Name" value={name} onChangeText={setName} />
          <Input label="Position" value={position} onChangeText={setPosition} />

          <Select
            options={sexOptions}
            value={sex}
            onChange={setSex}
            placeholder="Sex"
            error={validationError}
          />
          <View className="mt-4 space-y-1">
            <Checkbox
              label="I agree to the terms and conditions"
              description="You must accept our terms to continue"
              checked={agreeToTerms}
              onToggle={setAgreeToTerms}
              variant={!agreeToTerms && termsError ? "error" : "default"}
            />

            <Checkbox
              label="I agree to the privacy policy"
              description="You must accept our privacy policy to continue"
              checked={agreeToPrivacy}
              onToggle={setAgreeToPrivacy}
              variant={!agreeToPrivacy && termsError ? "error" : "default"}
            />

            <Checkbox
              label="I would like to receive marketing communications"
              description="This is optional, you can opt out anytime"
              checked={agreeToMarketing}
              onToggle={setAgreeToMarketing}
            />

            <Checkbox
              label="Select All"
              checked={selectAll}
              indeterminate={isIndeterminate}
              onToggle={handleSelectAll}
            />

            {termsError ? (
              <Text className="text-error-base-light dark:text-error-base-dark text-sm ml-9 mt-1">
                {termsError}
              </Text>
            ) : null}
          </View>
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
