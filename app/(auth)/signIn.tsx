import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authTweet";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutate } = useMutation({
    mutationFn: login,
  });
  const handleSignIn = async () => {
    try {
      mutate({ email });
      console.warn("sign in email", email);
      router.push({ pathname: "/authenticate", params: { email } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>SignIn or Create An Account </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

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
