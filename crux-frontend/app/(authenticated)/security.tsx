import React from "react";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock, ChevronRight } from "lucide-react-native";
import Header from "@/components/Header";

export default function SecurityScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = React.useState(true);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>Account security</Text>

      <View style={styles.card}>
        <Pressable
          style={styles.changePasswordButton}
          onPress={() => router.push("/change-password")}
        >
          <View style={styles.buttonContent}>
            <View style={styles.iconContainer}>
              <Lock size={20} color="#4A55A2" />
            </View>
            <Text style={styles.buttonText}>Change password</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </Pressable>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
            <Text style={styles.settingDescription}>
              Enable two-factor authentication for added security.
            </Text>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: "#f4f4f5", true: "#FF4081" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>FaceID</Text>
            <Text style={styles.settingDescription}>
              Secure your account with Face ID for fast and easy access.
            </Text>
          </View>
          <Switch
            value={faceIdEnabled}
            onValueChange={setFaceIdEnabled}
            trackColor={{ false: "#f4f4f5", true: "#FF4081" }}
            thumbColor="#fff"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
    maxWidth: "80%",
  },
});
