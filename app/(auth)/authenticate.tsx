import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { authenticate } from "@/api/authTweet";
import { useAuth } from "@/context/AuthContext";

const Authenticate = () => {
  const { email } = useGlobalSearchParams();
  const [code, setCode] = useState("");
  const { updateAuthToken } = useAuth();
  const userEmail = email as string;
  const handleAuthenticate = async () => {
    try {
      const res = await authenticate({ email: userEmail, emailToken: code });
      await updateAuthToken(res?.token);
      console.warn("Auth Code with Email", email);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm Email Code </Text>
      <TextInput
        style={styles.input}
        placeholder="Email Code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <Pressable style={styles.button} onPress={handleAuthenticate}>
        <Text style={styles.buttonText}>Confirm </Text>
      </Pressable>
    </View>
  );
};

export default Authenticate;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#050A12",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  input: {
    borderColor: "#808080",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 18,
    marginVertical: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 25,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
    color: "gray",
  },
});
