import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Colors } from "@/constants/Colors";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontFamily: "poppins",
          }}
        >
          Let's Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "90%",
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});
export default SignInWithOAuth;
