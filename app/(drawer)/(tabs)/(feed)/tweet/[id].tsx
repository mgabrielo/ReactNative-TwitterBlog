import React from "react";
import Tweet from "@/components/Tweet";
import tweets from "@/assets/data/tweets";
import { useGlobalSearchParams } from "expo-router";
import { Text } from "react-native";

const TweetScreen = () => {
  const { id } = useGlobalSearchParams();
  const tweet = tweets.find((tweet) => tweet.id == id);
  function TweetNotFound() {
    return <Text>Tweet Not Found</Text>;
  }
  return tweet ? <Tweet tweet={tweet} /> : <TweetNotFound />;
};

export default TweetScreen;
