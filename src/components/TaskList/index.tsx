import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Typography } from "../../constants/typography";
import formatDate from "../../constants/Helpers/formatDate";
import { Task } from "../../constants/types";

interface TaskListProps {
  tasks: Task[];
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title }) => {
  const [sortedData, setSortedData] = useState<Task[]>([]);
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>("time");
  const sheetRef = useRef(null);

  useEffect(() => {
    setSortedData(tasks);
  }, [tasks]);

  const sortTasks = (order) => {
    const tasksCopy = [...tasks];

    if (order === "alphabetical") {
      tasksCopy.sort((a, b) => a.title.trim().localeCompare(b.title.trim()));
    } else if (order === "time") {
      tasksCopy.sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
    }

    setSortedData(tasksCopy);
    setSelectedSortOrder(order);
    sheetRef.current.close();
  };

  const Item = React.memo(({ tasks }: { tasks: Task }) => {
    return (
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          {tasks.images && tasks.images.length > 0 ? (
            <Image
              source={{ uri: tasks.images[0]?.url }}
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image" size={48} color="grey" />
              <Text style={styles.placeholderText}>Failed to load image</Text>
            </View>
          )}

          <TouchableOpacity style={styles.heartIconContainer}>
            <Ionicons name="heart-outline" size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={styles.taskDetails}>
          <Text style={Typography.body}>{tasks.title}</Text>
          <View style={styles.likesContainer}>
            <Text style={Typography.body}>{tasks.number_of_likes}</Text>
            <Ionicons name="heart" size={24} color="red" />
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={Typography.body}>{formatDate(tasks.start_date)}</Text>
        </View>
      </View>
    );
  });

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[Typography.title, styles.headerTitle]}>{title}</Text>
      <TouchableOpacity onPress={() => sheetRef.current.show()}>
        <Ionicons
          name="filter"
          size={32}
          color="black"
          style={styles.headerIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => <Item tasks={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
      />
      <BottomSheet ref={sheetRef} height={300}>
        <View style={styles.sheetContainer}>
          <Text style={[Typography.title, styles.sheetTitle]}>Sort By</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => sortTasks("time")}
          >
            <View style={styles.optionRow}>
              <Text style={Typography.body}>Time Order</Text>
              {selectedSortOrder === "time" && (
                <Ionicons name="checkmark" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => sortTasks("alphabetical")}
          >
            <View style={styles.optionRow}>
              <Text style={Typography.body}>Alphabetical Order</Text>
              {selectedSortOrder === "alphabetical" && (
                <Ionicons name="checkmark" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => sheetRef.current.close()}
          >
            <Text style={Typography.body}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20,
  },
  headerTitle: {
    position: "absolute",
    left: 20,
    top: 0,
  },
  headerIcon: {
    position: "absolute",
    right: 20,
  },
  listContainer: {
    alignItems: "center",
  },
  item: {
    width: 350,
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeholder: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  placeholderText: {
    color: "grey",
    marginTop: 8,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesContainer: {
    flexDirection: "row",
    gap: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  sheetContainer: {
    backgroundColor: "white",
    padding: 20,
    height: 300,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
  },
  optionRow: {
    flexDirection: "row",
    gap: 8,
  },

  closeButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
  },
  heartIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 5,
  },
});

export default TaskList;
