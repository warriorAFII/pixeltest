import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import TaskList from "../../components/TaskList";
import { Task } from "../../constants/types";
interface CompletedProps {
  tasks: Task[];
}

const Completed: React.FC<CompletedProps> = ({ tasks }) => {
  const [filteredData, setFilteredData] = useState<Task[]>([]);

  useEffect(() => {
    filterNewTasks();
  }, [tasks]);

  const filterNewTasks = () => {
    const newTasks = tasks.filter((task) => task.status === "COMPLETED");
    setFilteredData(newTasks);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TaskList tasks={filteredData} title="Completed" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Completed;
