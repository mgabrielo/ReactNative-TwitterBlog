import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
const TweetHeader = ({
  title,
  navigation,
}: {
  title: string;
  navigation?: any;
}) => {
  function AvatarHeader() {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Image
          src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png"
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
          }}
        />
      </Pressable>
    );
  }
  return (
    <View
      style={{
        paddingTop: 15,
        paddingHorizontal: 10,
        paddingBottom: 5,
        marginTop: 40,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ display: "flex", padding: 0 }}>
        <AvatarHeader />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default TweetHeader;

const styles = StyleSheet.create({});
