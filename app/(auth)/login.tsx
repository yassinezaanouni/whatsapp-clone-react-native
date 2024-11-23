import {
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        await signIn(email, password);
      }
    } catch (error: any) {
      let message = "Failed to sign in";
      if (error.code === "auth/invalid-email") {
        message = "Invalid email address";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password";
      }
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg.jpg")}
      className="flex-1"
    >
      <SafeAreaView className="items-center justify-center flex-1 p-4">
        <Text className="text-teal-green mb-8 text-3xl font-bold">
          WhatsApp
        </Text>

        <View className="bg-white/90 rounded-2xl w-full p-6 shadow-lg">
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
            className="w-full p-4 mb-6 bg-white border border-gray-200 rounded-lg"
            secureTextEntry
            placeholderTextColor="#667781"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-teal-green items-center p-4 rounded-lg shadow-sm"
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-lg font-bold text-white">
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>

        <Link href="/signup" asChild>
          <TouchableOpacity className="mt-6">
            <Text className="text-teal-dark text-base">
              Don't have an account? <Text className="font-bold">Sign up</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </ImageBackground>
  );
}
