import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet } from "@/api/apiTweet";

const user = {
  id: "987654321",
  name: "Zuck",
  username: "zuck",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
};
const NewTweet = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.setQueriesData(
        { queryKey: ["tweets"] },
        (existingTweets: any) => {
          return [...existingTweets, data];
        }
      );
    },
  });
  const router = useRouter();
  const onTweetPress = async () => {
    try {
      await mutateAsync({ content: text });
      setText("");
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href={"../"} style={{ fontSize: 18 }}>
            Cancel
          </Link>
          {isPending && <ActivityIndicator />}
          <Pressable style={styles.pressButton} onPress={onTweetPress}>
            <Text style={styles.pressableText}>Tweet</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Image src={user.image} style={styles.image} />
          <TextInput
            placeholder="what is happening..?"
            multiline={true}
            value={text}
            onChangeText={(value) => setText(value)}
            numberOfLines={4}
            style={styles.textInput}
          />
        </View>
        {isError && <Text>{error.message}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default NewTweet;

const styles = StyleSheet.create({
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 0,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  pressButton: {
    backgroundColor: "#1C9BF0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  pressableText: {
    color: "white",
  },
});
