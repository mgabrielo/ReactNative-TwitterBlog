import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { View } from "@/components/Themed";
import Tweet from "@/components/Tweet";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { listTweets } from "@/api/apiTweet";
import { useQuery } from "@tanstack/react-query";

export default function FeedScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
  });

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <Text>{error.message}</Text>
      </View>
    );
  }
  // console.log({ data: data });
  // console.log({ error: error });
  return (
    <View style={homeStyles.page}>
      <FlatList data={data} renderItem={({ item }) => <Tweet tweet={item} />} />
      <Link href={"/new-tweet"} asChild>
        <Pressable style={homeStyles.floatingButton}>
          <Entypo name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

export const homeStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  floatingButton: {
    backgroundColor: "#1C9BF0", // twitter color
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 5,
  },
});
