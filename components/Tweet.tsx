import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { TweetType } from "@/types";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import { Link } from "expo-router";

interface TweetProps {
  tweet: TweetType;
}

const Tweet: FC<TweetProps> = ({ tweet }) => {
  return (
    <Link href={`/(drawer)/(tabs)/(feed)/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.tweetContainer}>
          <Image src={tweet?.user?.image} style={styles?.userImage} />
          <View style={styles.mainContainer}>
            <View style={styles.spaceContainer}>
              <View style={styles.tagName}>
                <Text style={styles.name}>{tweet?.user?.name}</Text>
                <Text style={styles.username}>@{tweet?.user?.username}</Text>
                <Text style={styles.postedTime}>·2h</Text>
              </View>
              <View style={styles.menuDots}>
                <Entypo name="dots-three-horizontal" size={16} color="gray" />
              </View>
            </View>
            <Text style={styles?.content}>{tweet?.content}</Text>
            {tweet?.image && (
              <View style={styles.imageContainer}>
                <Image src={tweet?.image} style={styles.image} />
              </View>
            )}
            <View style={styles.footer}>
              <IconButton iconName={"comment"} text={tweet?.numberOfComments} />
              <IconButton iconName={"retweet"} text={tweet?.numberOfRetweets} />
              <IconButton iconName={"heart"} text={tweet?.numberOfLikes} />
              <IconButton iconName={"chart"} text={tweet?.impressions} />
              <IconButton iconName={"share-apple"} />
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    borderColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageContainer: {
    objectFit: "cover",
    width: "100%",
    height: "auto",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
  },
  tweetContainer: {
    flexDirection: "row",
    flex: 1,
  },
  spaceContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  name: {
    fontWeight: "700",
  },
  username: {
    fontWeight: "400",
  },
  content: {
    lineHeight: 20,
    paddingTop: 5,
    paddingRight: 15,
  },
  image: {
    width: "100%",
    aspectRatio: "16/9",
    marginTop: 10,
    borderRadius: 15,
  },

  tagName: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  postedTime: {
    paddingLeft: 10,
    fontWeight: "400",
  },
  menuDots: {
    paddingHorizontal: 12,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerIcon: {},
});

export default Tweet;
