import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Menu"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="menu" size={30} color="#fff" />
          ),
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={30} color="#fff" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={30} color="#fff" />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1A237E",
    height: 50,
    paddingHorizontal: 10,
    borderTopWidth: 0,
  },
});
