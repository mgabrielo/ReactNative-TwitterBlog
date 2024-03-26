import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { View, Text } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import TweetHeader from "@/components/TweetHeader";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(drawer)"
          options={{
            header() {
              return <TweetHeader title="Twitter" />;
            },
          }}
        />
        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
        {/* <Stack.Screen
          name="/tweet/[id]"
          options={{
            header(props) {
              return <TweetHeader title="New Tweet" />;
            },
          }}
        /> */}
        <Stack.Screen
          name="new-tweet"
          options={{
            header(props) {
              return <TweetHeader title="New Tweet" />;
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
