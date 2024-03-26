import { Stack, withLayoutContext } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TweetHeader from "@/components/TweetHeader";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createRef } from "react";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          fontSize: 20,
          alignSelf: "center",
          marginVertical: 13,
        }}
      >
        Hello User
      </Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Drawer.Screen
        name="bookmarks"
        options={{ headerShown: false, title: "Bookmarks" }}
      />
      <Drawer.Screen
        name="twitter-blue"
        options={{ headerShown: false, title: "TwitterBlue" }}
      />
    </Drawer>
  );
}
