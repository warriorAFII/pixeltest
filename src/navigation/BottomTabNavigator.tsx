import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Home from "../screens/Home";
import Completed from "../screens/Completed";
import InProgress from "../screens/InProgress";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ iconName, focused }) => (
  <View style={styles.iconWrapper}>
    {focused && <View style={styles.indent} />}
    <FontAwesome5
      name={iconName}
      size={24}
      color={focused ? "white" : "gray"}
    />
  </View>
);

const BottomTabNavigator = ({ tasks }) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          bottom: 30,
          left: 30,
          right: 30,
          borderRadius: 16,
          backgroundColor: "black",
          position: "absolute",
          height: 70,
          borderWidth: 0,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "In Progress") {
            iconName = "hammer";
          } else if (route.name === "Completed") {
            iconName = "clipboard-check";
          }
          return <CustomTabIcon iconName={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home">{() => <Home tasks={tasks} />}</Tab.Screen>
      <Tab.Screen name="In Progress">
        {() => <InProgress tasks={tasks} />}
      </Tab.Screen>
      <Tab.Screen name="Completed">
        {() => <Completed tasks={tasks} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    position: "relative",
  },
  indent: {
    position: "absolute",
    top: 0,
    width: 60,
    height: 4,
    backgroundColor: "white",
    borderRadius: 3,
  },
});

export default BottomTabNavigator;
