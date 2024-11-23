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
        <Text className="mt-2 text-gray-600">Logged in as: {user?.email}</Text>
        <TouchableOpacity
          onPress={signOut}
          className="w-24 p-2 mt-4 bg-red-500 rounded-lg"
        >
          <Text className="text-center text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
