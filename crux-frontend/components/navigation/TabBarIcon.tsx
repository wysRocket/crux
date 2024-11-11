import { Ionicons } from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import Animated, { withSpring } from "react-native-reanimated";

type TabBarIconProps = IconProps<ComponentProps<typeof Ionicons>["name"]> & {
  active?: boolean;
};

export function TabBarIcon({ style, active, ...rest }: TabBarIconProps) {
  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              scale: withSpring(active ? 1.2 : 1),
            },
          ],
        },
      ]}
    >
      <Ionicons
        size={24}
        style={[
          {
            marginBottom: -3,
            color: active ? "#4A55A2" : "#666",
          },
          style,
        ]}
        {...rest}
      />
    </Animated.View>
  );
}
