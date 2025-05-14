import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import NavigationBar from "@/components/navigationBar/navigationBar";

export default () => {
  return (
    <Tabs
      tabBar={(props) => <NavigationBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="menu" options={{}} />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={30}
              color={focused ? "#FFD700" : "#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={30}
              color={focused ? "#FFD700" : "#fff"}
            />
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
