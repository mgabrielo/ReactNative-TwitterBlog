import React, { useContext, useEffect } from "react";
import Tweet from "@/components/Tweet";
import tweets from "@/assets/data/tweets";
import { useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { HeaderContext } from "@/app/_layout";
import { useQuery } from "@tanstack/react-query";
import { getTweet } from "@/api/apiTweet";

const TweetScreen = () => {
  const routeName = useRoute();
  const { setHeaderName } = useContext(HeaderContext);
  const { id } = useGlobalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweet(id as string),
  });

  useEffect(() => {
    if (id) {
      setHeaderName(routeName?.name);
    }
    return () => {
      setHeaderName("");
    };
  }, [id]);

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

  return data ? <Tweet tweet={data} /> : null;
};

export default TweetScreen;
