import React, { useMemo, useState, useCallback } from "react";
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
    if (terms && privacy && marketing) return { checked: true };
    if (terms || privacy || marketing) return { indeterminate: true };
    return { checked: false };
  }, [checkboxes.terms, checkboxes.privacy, checkboxes.marketing]);

  const updateField = useCallback(
    (field: keyof FormData, value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (field === "sex") {
        setErrors((prev) => (prev.sex ? { ...prev, sex: "" } : prev));
      }
    },
    []
  );

  const updateCheckbox = useCallback(
    (name: keyof CheckboxStates, checked: boolean): void => {
      setCheckboxes((prev) => {
        const newCheckboxes = { ...prev, [name]: checked };

        if (
          (name === "terms" || name === "privacy") &&
          newCheckboxes.terms &&
          newCheckboxes.privacy
        ) {
          setErrors((prev) =>
            prev.agreements ? { ...prev, agreements: "" } : prev
          );
        }

        return newCheckboxes;
      });
    },
    []
  );

  const handleSelectAll = useCallback((checked: boolean): void => {
    setCheckboxes({
      terms: checked,
      privacy: checked,
      marketing: checked,
    });

    if (checked) {
      setErrors((prev) =>
        prev.agreements ? { ...prev, agreements: "" } : prev
      );
    }
  }, []);

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

  const termsHasError = !checkboxes.terms && !!errors.agreements;
  const privacyHasError = !checkboxes.privacy && !!errors.agreements;

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
              checked={checkboxes.terms}
              onChange={(checked) => updateCheckbox("terms", checked)}
              error={termsHasError}
            />

            <Checkbox
              label="I agree to the privacy policy"
              description="You must accept our privacy policy to continue"
              checked={checkboxes.privacy}
              onChange={(checked) => updateCheckbox("privacy", checked)}
              error={privacyHasError}
            />

            <Checkbox
              label="I would like to receive marketing communications"
              description="This is optional, you can opt out anytime"
              checked={checkboxes.marketing}
              onChange={(checked) => updateCheckbox("marketing", checked)}
            />

            <Checkbox
              label="Select All"
              onChange={handleSelectAll}
              {...selectAll}
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
