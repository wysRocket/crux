import React from "react";
import { View, Text, Switch, Pressable, StyleSheet } from "react-native";
import Header from "@/components/Header";

export default function NotificationsScreen() {
  const [masterEnabled, setMasterEnabled] = React.useState(true);
  const [messagesEnabled, setMessagesEnabled] = React.useState(true);
  const [sharedFilesEnabled, setSharedFilesEnabled] = React.useState(false);
  const [securityEnabled, setSecurityEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notifications</Text>
          <Switch
            value={masterEnabled}
            onValueChange={setMasterEnabled}
            trackColor={{ false: "#f4f4f5", true: "#FF4081" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General notifications</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingTitle}>Messages & Alerts</Text>
                <Text style={styles.settingDescription}>
                  Receive messages and updates about your files
                </Text>
              </View>
              <Switch
                value={messagesEnabled}
                onValueChange={setMessagesEnabled}
                trackColor={{ false: "#f4f4f5", true: "#FF4081" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingTitle}>Shared Files</Text>
                <Text style={styles.settingDescription}>
                  Alerts when files are shared with you
                </Text>
              </View>
              <Switch
                value={sharedFilesEnabled}
                onValueChange={setSharedFilesEnabled}
                trackColor={{ false: "#f4f4f5", true: "#FF4081" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security alerts</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingTitle}>Account security</Text>
                <Text style={styles.settingDescription}>
                  Get alerts for suspicious activities
                </Text>
              </View>
              <Switch
                value={securityEnabled}
                onValueChange={setSecurityEnabled}
                trackColor={{ false: "#f4f4f5", true: "#FF4081" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        <Pressable style={styles.resetButton}>
          <Text style={styles.resetText}>Reset all</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
  resetButton: {
    alignItems: "center",
    marginTop: "auto",
  },
  resetText: {
    color: "#FF4081",
    fontSize: 16,
  },
});
