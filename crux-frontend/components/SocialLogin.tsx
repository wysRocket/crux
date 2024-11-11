import { View, Pressable, Image, StyleSheet } from "react-native";

type SocialLoginProps = {
  onSocialLogin: (platform: string) => void;
};

export function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  return (
    <View style={styles.socialButtons}>
      <Pressable
        onPress={() => onSocialLogin("LinkedIn")}
        style={styles.socialButton}
      >
        <Image
          source={require("@/assets/images/linked.png")}
          style={styles.socialIcon}
        />
      </Pressable>
      <Pressable
        onPress={() => onSocialLogin("Google")}
        style={styles.socialButton}
      >
        <Image
          source={require("@/assets/images/google-icon.png")}
          style={styles.socialIcon}
        />
      </Pressable>
      <Pressable
        onPress={() => onSocialLogin("Instagram")}
        style={styles.socialButton}
      >
        <Image
          source={require("@/assets/images/Instagram.png")}
          style={styles.socialIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  socialButton: {
    padding: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});
