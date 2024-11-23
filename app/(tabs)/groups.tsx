import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/config/firebase";
import { ref, get } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";
import { Header } from "@/components/Header";

type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export default function GroupsScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user: currentUser } = useAuth();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const fetchUsers = async () => {
    try {
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersArray = Object.entries(usersData)
          .map(([id, data]: [string, any]) => ({
            id,
            ...data,
          }))
          .filter((user) => user.id !== currentUser?.id);

        setUsers(usersArray);
        setFilteredUsers(usersArray);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity className="rounded-xl flex-row items-center p-4 mb-2 bg-white shadow-sm">
      {/* Avatar */}
      <View className="bg-teal-green/10 items-center justify-center w-12 h-12 mr-4 rounded-full">
        <Text className="text-teal-green text-lg font-semibold">
          {item.fullName.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* User Info */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">
          {item.fullName}
        </Text>
        <Text className="text-sm text-gray-500">{item.email}</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity className="bg-teal-green/10 active:bg-teal-green/20 p-3 rounded-full">
        <Ionicons name="chatbubble-outline" size={20} color="#128C7E" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="bg-gray-50 items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#128C7E" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-50 flex-1">
      <Header
        title="Users"
        showSearch
        searchProps={{
          value: searchQuery,
          onChangeText: handleSearch,
          placeholder: "Search users...",
          onClear: () => handleSearch(""),
        }}
        subtitle={`${filteredUsers.length} ${
          filteredUsers.length === 1 ? "user" : "users"
        } found`}
      />

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-2" />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#128C7E"]}
            tintColor="#128C7E"
          />
        }
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-20">
            <View className="bg-gray-100/80 p-4 mb-4 rounded-full">
              <Ionicons name="people-outline" size={48} color="#128C7E" />
            </View>
            <Text className="text-lg font-medium text-center text-gray-600">
              No users found
            </Text>
            <Text className="mt-1 text-sm text-center text-gray-500">
              Try searching with a different keyword
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
