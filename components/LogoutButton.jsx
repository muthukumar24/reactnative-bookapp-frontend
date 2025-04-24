import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "@/assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

const LogoutButton = () => {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure want to logout?", [
      { text: "Canel", style: "cancel" },
      { text: "Logut", onPress: () => logout(), style: "destructive" },
    ]);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default LogoutButton;
