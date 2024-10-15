import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import TaskList from "../../components/TaskList";
import { Task } from "../../constants/types";
interface InProgressProps {
  tasks: Task[];
}

const InProgress: React.FC<InProgressProps> = ({ tasks }) => {
  const [filteredData, setFilteredData] = useState<Task[]>([]);

  useEffect(() => {
    filterNewTasks();
  }, [tasks]);

  const filterNewTasks = () => {
    const newTasks = tasks.filter((task) => task.status === "OFFER_ACCEPTED");
    setFilteredData(newTasks);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TaskList tasks={filteredData} title="In Progress" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InProgress;
