import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

export const fetchApprovedDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors/approved`);
    return response.data; // returns an array
  } catch (error) {
    console.error("Error fetching approved doctors:", error);
    return [];
  }
};
