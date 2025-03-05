import React, { useMemo, useState } from "react";
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
import { Checkbox, CheckboxState } from "../components/Checkbox";

const sexOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

interface FormData {
  name: string;
  position: string;
  sex: string;
}

interface CheckboxStates {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface ErrorStates {
  sex?: string;
  agreements?: string;
}

export function HomeScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    sex: "",
  });

  const [checkboxes, setCheckboxes] = useState<CheckboxStates>({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [errors, setErrors] = useState<ErrorStates>({});

  const selectAll = useMemo(() => {
    const { terms, privacy, marketing } = checkboxes;
    if (terms && privacy && marketing) return "checked";
    if (terms || privacy || marketing) return "indeterminate";
    return "unchecked";
  }, [checkboxes.terms, checkboxes.privacy, checkboxes.marketing]);

  const updateField = (field: keyof FormData, value: string): void => {
    setFormData({ ...formData, [field]: value });

    if (field === "sex" && errors.sex) {
      setErrors({ ...errors, sex: "" });
    }
  };

  const updateCheckbox = (
    name: keyof CheckboxStates,
    checked: boolean
  ): void => {
    const newCheckboxes = { ...checkboxes, [name]: checked };
    setCheckboxes(newCheckboxes);

    if (
      (name === "terms" || name === "privacy") &&
      newCheckboxes.terms &&
      newCheckboxes.privacy &&
      errors.agreements
    ) {
      setErrors({ ...errors, agreements: "" });
    }
  };

  const handleSelectAll = (checked: boolean): void => {
    setCheckboxes({
      terms: checked,
      privacy: checked,
      marketing: checked,
    });

    if (checked && errors.agreements) {
      setErrors({ ...errors, agreements: "" });
    }
  };

  const handleSubmit = (): void => {
    const newErrors: ErrorStates = {};

    if (!formData.sex) {
      newErrors.sex = "Please select your sex";
    }

    if (!checkboxes.terms || !checkboxes.privacy) {
      newErrors.agreements = "You must agree to the terms and privacy policy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    Alert.alert(
      "Profile Updated",
      `Name: ${formData.name}
Position: ${formData.position}
Sex: ${
        sexOptions.find((option) => option.value === formData.sex)?.label ||
        "None"
      }
Agreed to Terms: Yes
Agreed to Privacy: Yes
Agreed to Marketing: ${checkboxes.marketing ? "Yes" : "No"}`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-layout-container-light dark:bg-layout-container-dark">
      <ScrollView className="flex-1 p-5">
        <Text className="text-3xl font-bold text-content-primary-light dark:text-content-primary-dark mb-8">
          Profile Info
        </Text>

        <View className="flex-1 gap-5">
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => updateField("name", value)}
          />

          <Input
            label="Position"
            value={formData.position}
            onChangeText={(value) => updateField("position", value)}
          />

          <Select
            options={sexOptions}
            value={formData.sex}
            onChange={(value) => updateField("sex", value)}
            placeholder="Sex"
            error={errors.sex}
          />

          <View className="mt-4 space-y-1">
            <Checkbox
              label="I agree to the terms and conditions"
              description="You must accept our terms to continue"
              state={checkboxes.terms ? "checked" : "unchecked"}
              onChange={(checked) => updateCheckbox("terms", checked)}
              error={Boolean(!checkboxes.terms && errors.agreements)}
            />

            <Checkbox
              label="I agree to the privacy policy"
              description="You must accept our privacy policy to continue"
              state={checkboxes.privacy ? "checked" : "unchecked"}
              onChange={(checked) => updateCheckbox("privacy", checked)}
              error={Boolean(!checkboxes.privacy && errors.agreements)}
            />

            <Checkbox
              label="I would like to receive marketing communications"
              description="This is optional, you can opt out anytime"
              state={checkboxes.marketing ? "checked" : "unchecked"}
              onChange={(checked) => updateCheckbox("marketing", checked)}
            />

            <Checkbox
              label="Select All"
              state={selectAll}
              onChange={handleSelectAll}
            />

            {errors.agreements && (
              <Text className="text-error-base-light dark:text-error-base-dark text-sm ml-9 mt-1">
                {errors.agreements}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          className="bg-primary-base-light dark:bg-primary-base-dark py-5 rounded-2xl mt-8"
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text className="text-additional-white-Base text-center font-medium">
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
