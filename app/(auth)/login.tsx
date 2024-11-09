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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Error", "Failed to sign in");
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
          >
            <Text className="text-lg font-bold text-white">Login</Text>
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
