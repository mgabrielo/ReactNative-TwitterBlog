import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, useNavigation } from "expo-router";
useNavigation;
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import TweetHeader from "@/components/TweetHeader";
import AuthContextProvider from "@/context/AuthContext";
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

export const HeaderContext = createContext<any | null>(null);
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [headerName, setHeaderName] = useState("");

  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <HeaderContext.Provider value={{ setHeaderName }}>
            <Stack>
              <Stack.Screen
                name="(drawer)"
                options={{
                  header() {
                    return headerName !== "tweet/[id]" ? (
                      <TweetHeader title="Twitter" />
                    ) : null;
                  },
                }}
              />
              <Stack.Screen
                name="new-tweet"
                options={{
                  header(props) {
                    return <TweetHeader title="New Tweet" />;
                  },
                }}
              />
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)/signIn"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)/authenticate"
                options={{
                  title: "Confirm SignIn",
                }}
              />
            </Stack>
          </HeaderContext.Provider>
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
