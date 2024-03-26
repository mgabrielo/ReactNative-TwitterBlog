import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { Link, router, useNavigation, useRouter } from "expo-router";

const user = {
  id: "987654321",
  name: "Zuck",
  username: "zuck",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
};
const NewTweet = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const onTweetPress = () => {
    console.log("tweet sent", text);
    router.back();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href={"../"} style={{ fontSize: 18 }}>
            Cancel
          </Link>
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
