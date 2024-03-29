import TweetHeader from "@/components/TweetHeader";
import { Stack } from "expo-router";

export default function FeedLayout({}) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="tweet/[id]"
        options={{
          headerShown: true,
          title: "Viewed Tweet",
          header() {
            return <TweetHeader title=" Viewed tweet" avatarVisible={false} />;
          },
        }}
      />
    </Stack>
  );
}
