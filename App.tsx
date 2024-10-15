import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import {
  useFonts,
  Raleway_500Medium,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider } from "@apollo/client";
import { fetchTasks } from "./src/services/api";
import client from "./src/config/apolloClient";
import { Task } from "./src/constants/types";

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [fontsLoaded] = useFonts({
    Raleway_500Medium,
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
        await SplashScreen.hideAsync();
      }
    };

    getTasks();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <BottomTabNavigator tasks={tasks} />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
