import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, X } from "lucide-react-native";

type Nominee = {
  email: string;
  relationship: string;
  color: string;
};

export default function Nominees() {
  const router = useRouter();
  const [nominees, setNominees] = useState<Nominee[]>([
    { email: "mom@mail.com", relationship: "Mom", color: "#E3F2FD" },
    { email: "max@mail.com", relationship: "Friend", color: "#FCE4EC" },
    { email: "johny@mail.com", relationship: "Brother", color: "#E8F5E9" },
  ]);
  const [newEmail, setNewEmail] = useState("");
  const [newRelationship, setNewRelationship] = useState("Friend");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const relationships = ["Friend", "Mom", "Dad", "Brother", "Sister"];

  const removeNominee = (email: string) => {
    setNominees(nominees.filter((nominee) => nominee.email !== email));
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "Mom":
        return "#E3F2FD";
      case "Friend":
        return "#FCE4EC";
      case "Brother":
        return "#E8F5E9";
      default:
        return "#F5F5F5";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.progress}>3/3</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Set digital nominees</Text>
        <Text style={styles.subtitle}>
          Digital nominees are trusted people who can access your files. You can
          edit this anytime.
        </Text>

        <Text style={styles.sectionTitle}>Add nominee</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.nameInput}
            placeholder="Nominee's name"
            placeholderTextColor="#666"
            value={newEmail}
            onChangeText={setNewEmail}
          />
          <View style={styles.row}>
            <Pressable
              style={styles.relationshipButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.relationshipButtonText}>
                {newRelationship}
              </Text>
              <ChevronDown size={20} color="#666" />
            </Pressable>
            <TextInput
              style={styles.emailInput}
              placeholder="max@mail.com"
              placeholderTextColor="#666"
              inputMode="email"
            />
          </View>
          {isDropdownOpen && (
            <View style={styles.dropdown}>
              {relationships.map((relationship) => (
                <Pressable
                  key={relationship}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setNewRelationship(relationship);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text>{relationship}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Sent invites</Text>
        <View style={styles.invitesList}>
          {nominees.map((nominee, index) => (
            <View
              key={index}
              style={[styles.inviteItem, { backgroundColor: nominee.color }]}
            >
              <Text style={styles.inviteEmail}>{nominee.email}</Text>
              <View style={styles.inviteActions}>
                <View style={styles.relationshipTag}>
                  <Text style={styles.relationshipTagText}>
                    {nominee.relationship}
                  </Text>
                </View>
                <Pressable
                  onPress={() => removeNominee(nominee.email)}
                  style={styles.removeButton}
                >
                  <X size={16} color="#666" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={styles.nextButton}
        onPress={() => router.push("/allset")}
      >
        <ArrowLeft
          size={24}
          color="#fff"
          style={{ transform: [{ rotate: "180deg" }] }}
        />
      </Pressable>
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
    padding: 20,
    paddingTop: 40,
  },
  progress: {
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  form: {
    marginBottom: 32,
  },
  nameInput: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  relationshipButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  relationshipButtonText: {
    fontSize: 16,
    color: "#000",
  },
  emailInput: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 2,
  },
  dropdown: {
    position: "absolute",
    top: 110,
    left: 0,
    right: "66%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderRadius: 8,
  },
  invitesList: {
    gap: 12,
  },
  inviteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  inviteEmail: {
    fontSize: 16,
  },
  inviteActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  relationshipTag: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  relationshipTagText: {
    fontSize: 14,
    fontWeight: "500",
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF4081",
    justifyContent: "center",
    alignItems: "center",
  },
});
