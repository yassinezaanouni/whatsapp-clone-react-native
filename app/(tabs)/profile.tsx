import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Text } from "react-native";
import { useAuth } from "@/context/auth";
import { db } from "@/config/firebase";
import { ref, get, update } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type UserProfile = {
  fullName: string;
  email: string;
  createdAt: string;
};

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user?.id) return;

    try {
      const userRef = ref(db, `users/${user.id}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setProfile(userData);
        setEditedName(userData.fullName);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch profile");
    }
  };

  const handleUpdateProfile = async () => {
    if (!user?.id || !editedName.trim()) return;

    setLoading(true);
    try {
      const userRef = ref(db, `users/${user.id}`);
      await update(userRef, {
        fullName: editedName.trim(),
        updatedAt: new Date().toISOString(),
      });

      setProfile((prev) => (prev ? { ...prev, fullName: editedName } : null));
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-50 flex-1">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-2xl font-bold text-gray-800">Profile</Text>
          <TouchableOpacity
            onPress={signOut}
            className="px-4 py-2 bg-gray-100 rounded-full"
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View className="items-center mb-8">
          <View className="relative">
            <View className="items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
              <Text className="text-3xl text-gray-500">
                {profile.fullName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity className="bg-teal-green absolute bottom-0 right-0 p-2 rounded-full">
              <Ionicons name="camera-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View className="rounded-3xl p-6 bg-white shadow-sm">
          {/* Name Field */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-medium text-gray-500">
              Full Name
            </Text>
            {isEditing ? (
              <TextInput
                value={editedName}
                onChangeText={setEditedName}
                className="bg-gray-50 rounded-xl p-3 text-lg"
                autoCapitalize="words"
                placeholder="Enter your name"
              />
            ) : (
              <View className="flex-row items-center justify-between">
                <Text className="text-lg text-gray-800">
                  {profile.fullName}
                </Text>
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <Ionicons name="pencil" size={20} color="#128C7E" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Email Field */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-medium text-gray-500">
              Email
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#128C7E" />
              <Text className="ml-2 text-lg text-gray-800">
                {profile.email}
              </Text>
            </View>
          </View>

          {/* Member Since Field */}
          <View>
            <Text className="mb-2 text-sm font-medium text-gray-500">
              Member Since
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="#128C7E" />
              <Text className="ml-2 text-lg text-gray-800">
                {new Date(profile.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>

          {/* Edit Actions */}
          {isEditing && (
            <View className="flex-row gap-3 mt-6">
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                  setEditedName(profile.fullName);
                }}
                className="rounded-xl flex-1 p-4 bg-gray-100"
              >
                <Text className="font-medium text-center text-gray-700">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateProfile}
                disabled={loading}
                className="bg-teal-green rounded-xl flex-1 p-4"
              >
                <Text className="font-medium text-center text-white">
                  {loading ? "Saving..." : "Save Changes"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Settings Section */}
        <View className="rounded-3xl p-4 mt-6 bg-white shadow-sm">
          <TouchableOpacity className="flex-row items-center justify-between p-3">
            <View className="flex-row items-center">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#128C7E"
              />
              <Text className="ml-3 font-medium text-gray-800">
                Notifications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#128C7E" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-3">
            <View className="flex-row items-center">
              <Ionicons name="lock-closed-outline" size={24} color="#128C7E" />
              <Text className="ml-3 font-medium text-gray-800">Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#128C7E" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
