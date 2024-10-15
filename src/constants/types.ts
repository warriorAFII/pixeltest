export interface Task {
  _id: string;
  title: string;
  status: string;
  number_of_likes: number;
  start_date: string;
  images: {
    url: string;
  }[];
}
