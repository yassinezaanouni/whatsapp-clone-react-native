import {
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebaseApp } from "@/app/_layout";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match!");
      return;
    }

    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with full name
      await updateProfile(user, {
        displayName: fullName,
      });

      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Show success message and redirect to login
      Alert.alert("Success", "Account created successfully! Please login.", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg.jpg")}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 p-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="#075E54" />
        </TouchableOpacity>

        <View className="items-center justify-center flex-1">
          <Text className="text-teal-green mb-8 text-3xl font-bold">
            Create Account
          </Text>

          <View className="bg-white/90 rounded-2xl w-full p-6 shadow-lg">
            <TextInput
              placeholder="Full Name"
              className="w-full p-4 mb-4 bg-white border border-gray-200 rounded-lg"
              autoCapitalize="words"
              placeholderTextColor="#667781"
              value={fullName}
              onChangeText={setFullName}
            />

            <TextInput
              placeholder="Email"
              className="w-full p-4 mb-4 bg-white border border-gray-200 rounded-lg"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#667781"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Password"
              className="w-full p-4 mb-4 bg-white border border-gray-200 rounded-lg"
              secureTextEntry
              placeholderTextColor="#667781"
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              placeholder="Confirm Password"
              className="w-full p-4 mb-6 bg-white border border-gray-200 rounded-lg"
              secureTextEntry
              placeholderTextColor="#667781"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              className={`bg-teal-green items-center w-full p-4 rounded-lg shadow-sm ${
                loading ? "opacity-50" : ""
              }`}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text className="text-lg font-bold text-white">
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          <Link href="/login" asChild>
            <TouchableOpacity className="mt-6">
              <Text className="text-teal-dark text-base">
                Already have an account?{" "}
                <Text className="font-bold">Login</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
