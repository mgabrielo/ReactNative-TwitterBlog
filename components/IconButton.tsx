import { EvilIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Text, View } from "react-native";

interface IconButtonProps {
  iconName?: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
}
const IconButton: FC<IconButtonProps> = ({ iconName, text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
      }}
    >
      <EvilIcons name={iconName} size={20} />
      <Text>{text}</Text>
    </View>
  );
};

export default IconButton;
