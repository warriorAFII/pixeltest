import React, { useMemo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TaskList from "../../components/TaskList";
import { Task } from "../../constants/types";
interface CompletedProps {
  tasks: Task[];
}

const Completed: React.FC<CompletedProps> = ({ tasks }) => {
  const filteredData = useMemo(() => {
    return tasks.filter((task) => task.status === "COMPLETED");
  }, [tasks]);
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
