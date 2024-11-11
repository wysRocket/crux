import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import {
  ChevronRight,
  Bell as BellIcon,
  Lock,
  HardDrive,
  LogOut,
} from "lucide-react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.replace("/auth");
  };

  const menuItems = [
    { icon: BellIcon, title: "Notifications", route: "/notifications" },
    { icon: Lock, title: "Security & Privacy", route: "/security" },
    { icon: HardDrive, title: "Storage", route: "/storage" },
  ];

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        {/* Profile Card */}
        <View style={[styles.profileCard, styles.cardShadow]}>
          <Image
            source={require("@/assets/images/profile-pic.png")}
            style={styles.profileImage}
            defaultSource={require("@/assets/images/profile-pic.png")}
          />
          <Text style={styles.profileName}>Alice Kelly</Text>
          <Text style={styles.profileEmail}>roxy@mail.com</Text>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </Pressable>
        </View>

        {/* Invite Banner */}
        <View style={styles.inviteBanner}>
          <Text style={styles.inviteText}>Bring in a trusted companion</Text>
          <Pressable style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Invite</Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <item.icon size={20} color="#4A55A2" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </Pressable>
          ))}

          <Pressable
            style={[styles.logoutButton, styles.menuItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <LogOut size={20} color="#4A55A2" />
              </View>
              <Text style={styles.menuItemText}>Log out</Text>
            </View>
            <ChevronRight size={20} color="#666" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    color: "#FF4081",
    fontSize: 16,
    fontWeight: "500",
  },
  inviteBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF4081",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  inviteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  inviteButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  inviteButtonText: {
    color: "#FF4081",
    fontWeight: "600",
  },
  menuContainer: {
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#F5F7FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
