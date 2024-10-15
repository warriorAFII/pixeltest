import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Home from "./Screens/Home";
import Completed from "./Screens/Completed";
import InProgress from "./Screens/InProgress";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { fetchTasks } from "./services/api";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        screenOptions={({ route }) => ({
          tabBarStyle: {
            bottom: 30,
            left: 30,
            right: 30,
            borderRadius: 8,
            backgroundColor: "black",
            position: "absolute",
            height: 70,
            borderWidth: 0,
            paddingBottom: 10, // Add padding to ensure vertical centering
          },
          tabBarActiveTintColor: "white", // Set active icon color to white
          tabBarInactiveTintColor: "white", // Set inactive icon color to white
          headerShown: false,

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home"; // Choose your icon
            } else if (route.name === "Completed") {
              iconName = "calendar"; // Choose your icon
            } else if (route.name === "InProgress") {
              iconName = "time"; // Choose your icon
            }

            // You can return any component that you like here!
            return (
              <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home">{() => <Home data={tasks} />}</Tab.Screen>

        <Tab.Screen name="In Progress" component={InProgress} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Ensure the icon container takes all available space
  },
});
