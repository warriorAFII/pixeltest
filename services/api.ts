import { gql } from "@apollo/client";
import client from "../config/apolloClient";

export const GET_TASKS = gql`
  query GetTasks {
    taskList {
      _id
      title
      status
      number_of_likes
      start_date
      images
    }
  }
`;

export const fetchTasks = async () => {
  try {
    const { data } = await client.query({ query: GET_TASKS });

    return data.taskList;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
