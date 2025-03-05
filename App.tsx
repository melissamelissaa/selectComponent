import "./global.css";
import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  return (
    <GestureHandlerRootView className=" flex: 1">
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <StatusBar />
          <HomeScreen />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
