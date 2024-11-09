import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/auth";

export default function HomeScreen() {
  const { signOut, user } = useAuth();

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <Text className="text-xl font-bold">Chats</Text>
        <Text className="text-gray-600 mt-2">Logged in as: {user?.email}</Text>
        <TouchableOpacity
          onPress={signOut}
          className="mt-4 bg-red-500 p-2 rounded-lg w-24"
        >
          <Text className="text-white text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
