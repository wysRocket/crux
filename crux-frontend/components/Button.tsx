import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonProps = {
  onPress: () => void;
  label: string;
  variant?: "primary" | "secondary";
};

export const Button = ({
  onPress,
  label,
  variant = "primary",
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, variant === "secondary" && styles.secondaryButton]}
      onPress={onPress}
    >
      <ThemedText
        style={[
          styles.buttonText,
          variant === "secondary" && styles.secondaryButtonText,
        ]}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#666",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButtonText: {
    color: "#666",
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
  },
});
