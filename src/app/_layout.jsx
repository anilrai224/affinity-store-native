import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from '../store/store';
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "poppins": require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large"/>;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </View>
    </Provider>
  );
}
