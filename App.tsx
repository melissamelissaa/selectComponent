import "./global.css";
import React from "react";
import { StatusBar, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar />
      <HomeScreen />
    </View>
  );
}
