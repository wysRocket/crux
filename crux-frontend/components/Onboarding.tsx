import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const OnboardingScreen = () => {
  const [step, setStep] = useState(-1); // Start at -1 for the sign-up/sign-in page
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
    verificationCode: "",
    invites: [],
  });

  const handleSocialSignIn = (platform: string) => {
    // Implement social sign-in logic here
    console.log(`Signing in with ${platform}`);
  };

  const screens = [
    // Sign-up/Sign-in screen
    {
      content: (
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>Crux</ThemedText>
          <ThemedText style={styles.subtitle}>
            Securely Store, Share, and Cherish Your Memories.
          </ThemedText>
          <TextInput
            placeholder="Email or phone number"
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={userData.password}
            onChangeText={(text) =>
              setUserData({ ...userData, password: text })
            }
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={() => setStep(0)}>
            <ThemedText style={styles.buttonText}>Sign In</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(0)}>
            <ThemedText style={styles.linkText}>Sign Up</ThemedText>
          </TouchableOpacity>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              onPress={() => handleSocialSignIn("LinkedIn")}
              style={styles.socialButton}
            >
              <Image
                source={require("@/assets/images/linkedin-logo.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSocialSignIn("Google")}
              style={styles.socialButton}
            >
              <Image
                source={require("@/assets/images/google-logo.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSocialSignIn("Instagram")}
              style={styles.socialButton}
            >
              <Image
                source={require("@/assets/images/instagram-logo.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </ThemedView>
      ),
    },
    // Existing screens...
    {
      title: "Let's get to know you!",
      subtitle: "Your Journey Starts Here — Just a Few Quick Details.",
      content: (
        <View>
          <TextInput
            placeholder="First name"
            value={userData.firstName}
            onChangeText={(text) =>
              setUserData({ ...userData, firstName: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Last name"
            value={userData.lastName}
            onChangeText={(text) =>
              setUserData({ ...userData, lastName: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="DD.MM.YYYY"
            value={userData.birthday}
            onChangeText={(text) =>
              setUserData({ ...userData, birthday: text })
            }
            style={styles.input}
          />
        </View>
      ),
    },
    {
      title: "Contact & info",
      subtitle: "Enter your email and phone number.",
      content: (
        <View>
          <TextInput
            placeholder="mail@crux.com"
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            style={styles.input}
            keyboardType="email-address"
          />
          <View style={styles.phoneInput}>
            <Text style={styles.phonePrefix}>US</Text>
            <TextInput
              placeholder="+1 (333) 000-0000"
              value={userData.phoneNumber}
              onChangeText={(text) =>
                setUserData({ ...userData, phoneNumber: text })
              }
              style={[styles.input, styles.phoneNumber]}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      ),
    },
    {
      title: "Enter 6-digit code",
      subtitle:
        "We've sent your code in two parts: check your email for the first 3 digits and your phone messages for the rest.",
      content: (
        <View>
          <View style={styles.codeInputContainer}>
            {[...Array(6)].map((_, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  const newCode = userData.verificationCode.split("");
                  newCode[index] = text;
                  setUserData({
                    ...userData,
                    verificationCode: newCode.join(""),
                  });
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.resendCode}>
            <Text style={styles.resendCodeText}>Resend codes in 00:29</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      title: "Invite family & friends",
      subtitle:
        "These are the people you will share files and memories with. You can edit role permissions later.",
      content: (
        <ScrollView>
          <View style={styles.inviteContainer}>
            {userData.invites.map((invite, index) => (
              <View key={index} style={styles.inviteItem}>
                <Text>{invite.email}</Text>
                <Text>{invite.role}</Text>
                <TouchableOpacity
                  onPress={() => {
                    const newInvites = [...userData.invites];
                    newInvites.splice(index, 1);
                    setUserData({ ...userData, invites: newInvites });
                  }}
                >
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.addInvite}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={(text) =>
                setUserData({ ...userData, currentInviteEmail: text })
              }
            />
            <TextInput
              placeholder="Role"
              style={styles.input}
              onChangeText={(text) =>
                setUserData({ ...userData, currentInviteRole: text })
              }
            />
            <TouchableOpacity
              onPress={() => {
                if (userData.currentInviteEmail && userData.currentInviteRole) {
                  setUserData({
                    ...userData,
                    invites: [
                      ...userData.invites,
                      {
                        email: userData.currentInviteEmail,
                        role: userData.currentInviteRole,
                      },
                    ],
                    currentInviteEmail: "",
                    currentInviteRole: "",
                  });
                }
              }}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ),
    },
  ];

  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      // Onboarding complete, navigate to main app
      router.replace("/explore");
    }
  };

  return (
    <ThemedView style={styles.container}>
      {step > -1 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep(step - 1)}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      {step > -1 && (
        <>
          <ThemedText style={styles.title}>{screens[step].title}</ThemedText>
          <ThemedText style={styles.subtitle}>
            {screens[step].subtitle}
          </ThemedText>
        </>
      )}
      {screens[step + 1].content}
      {step > -1 && (
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <ThemedText style={styles.continueButtonText}>
            {step === screens.length - 1 ? "Get Started" : "Continue"}
          </ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
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
  linkText: {
    color: "#0a7ea4",
    fontSize: 16,
    marginTop: 10,
  },
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  continueButton: {
    backgroundColor: "#666",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
