import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  subtitle?: string;
  rightIcon?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    color?: string;
  };
  showSearch?: boolean;
  searchProps?: SearchBarProps;
};

export function Header({
  title,
  subtitle,
  rightIcon,
  showSearch,
  searchProps,
}: HeaderProps) {
  return (
    <View className="rounded-xl bg-white shadow-sm">
      <View className=" flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-800">{title}</Text>
          {subtitle && (
            <Text className="mt-1 text-sm text-gray-500">{subtitle}</Text>
          )}
        </View>
        {rightIcon && (
          <TouchableOpacity
            onPress={rightIcon.onPress}
            className="p-2 ml-4 bg-gray-100 rounded-full"
          >
            <Ionicons name={rightIcon.name} size={24} color={rightIcon.color} />
          </TouchableOpacity>
        )}
      </View>
      {showSearch && searchProps && (
        <View className="">
          <SearchBar {...searchProps} />
        </View>
      )}
    </View>
  );
}

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder,
  onClear,
}: SearchBarProps) {
  return (
    <View className="">
      <View className="rounded-xl flex-row items-center px-4 py-2 bg-gray-100">
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          className="flex-1 ml-2 text-base"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="close-outline" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
