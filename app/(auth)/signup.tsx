import {
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
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
            />

            <TextInput
              placeholder="Email"
              className="w-full p-4 mb-4 bg-white border border-gray-200 rounded-lg"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#667781"
            />

            <TextInput
              placeholder="Password"
              className="w-full p-4 mb-4 bg-white border border-gray-200 rounded-lg"
              secureTextEntry
              placeholderTextColor="#667781"
            />

            <TextInput
              placeholder="Confirm Password"
              className="w-full p-4 mb-6 bg-white border border-gray-200 rounded-lg"
              secureTextEntry
              placeholderTextColor="#667781"
            />

            <TouchableOpacity
              className="bg-teal-green items-center w-full p-4 rounded-lg shadow-sm"
              onPress={() => console.log("Signup pressed")}
            >
              <Text className="text-lg font-bold text-white">Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Link href="/" asChild>
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
