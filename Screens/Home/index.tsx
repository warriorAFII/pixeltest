import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Typography } from "../../constants/typography";
import formatDate from "../../constants/Helpers/formatDate";
import BottomSheet from "react-native-gesture-bottom-sheet";

const Home = ({ data }) => {
  type ItemProps = { title: string };
  const [sortedData, setSortedData] = useState(data);
  const [selectedSortOrder, setSelectedSortOrder] = useState("time"); // State to track selected sort order

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  // Reference to the bottom sheet
  const sheetRef = useRef(null);
  const Item = ({ tasks }: ItemProps) => (
    <View style={styles.item}>
      {tasks.images && tasks.images.length > 0 ? (
        <Image source={{ uri: tasks.images[0]?.url }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image" size={48} color="grey" />
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={Typography.body}>{tasks.title}</Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Ionicons name="heart" size={24} color="red" />
          <Text style={Typography.body}>{tasks.number_of_likes}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 4,
          gap: 8,
        }}
      >
        <Ionicons name="calendar" size={24} color="black" />
        <Text style={Typography.body}>{formatDate(tasks.start_date)}</Text>
      </View>
    </View>
  );

  // Define the ListHeaderComponent here
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[Typography.title, styles.headerTitle]}>New tasks</Text>
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

  // Render Bottom Sheet content
  const renderContent = () => (
    <View style={styles.sheetContainer}>
      <Text style={styles.sheetTitle}>Sort By</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => sortTasks("alphabetical")}
      >
        <Text style={styles.optionText}>Alphabetical Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => sortTasks("time")}>
        <Text style={styles.optionText}>Time Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => sheetRef.current.close()} // Close the sheet
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  const sortTasks = (order) => {
    // Create a copy of the current sorted data
    const dataCopy = [...sortedData];

    // Sorting logic will depend on your task data structure
    if (order === "alphabetical") {
      dataCopy.sort((a, b) => {
        const titleA = a.title.trim(); // Trim whitespace from title
        const titleB = b.title.trim(); // Trim whitespace from title
        return titleA.localeCompare(titleB);
      });
    } else if (order === "time") {
      dataCopy.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    }

    // Update the state with the sorted data
    setSortedData(dataCopy);
    setSelectedSortOrder(order); // Update selected sort order state

    // Close the bottom sheet after sorting
    sheetRef.current.close();
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => <Item tasks={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader} // Include header in scrollable list
      />
      <BottomSheet
        ref={sheetRef}
        renderContent={renderContent} // Use renderContent here
        height={300}
      >
        <View style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>Sort By</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => sortTasks("time")}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.optionText}>Time Order</Text>
              {selectedSortOrder === "time" && (
                <Ionicons name="checkmark" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => sortTasks("alphabetical")}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.optionText}>Alphabetical Order</Text>
              {selectedSortOrder === "alphabetical" && (
                <Ionicons name="checkmark" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => sheetRef.current.close()} // Close the sheet
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full screen
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 20,
    gap: 150,
    paddingHorizontal: 20, // Add horizontal padding for better spacing
  },
  headerTitle: {
    marginRight: 10, // Add space between the title and the icon
  },
  listContainer: {
    paddingBottom: 30,
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
    backgroundColor: "#e0e0e0", // Grey background for the placeholder
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
    height: 300, // Height of the bottom sheet
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
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
});

export default Home;
