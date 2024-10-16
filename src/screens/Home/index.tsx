import React, { useMemo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TaskList from "../../components/TaskList";
import { Task } from "../../constants/types";

interface HomeProps {
  tasks: Task[];
}

const Home: React.FC<HomeProps> = ({ tasks }) => {
  const filteredData = useMemo(() => {
    return tasks.filter((task) => task.status === "NEW");
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <TaskList tasks={filteredData} title="New Tasks" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
