import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import tweets from "@/assets/data/tweets";
import Tweet from "@/components/Tweet";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
export default function TabOneScreen() {
  return (
    <View style={homeStyles.page}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
      />
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
