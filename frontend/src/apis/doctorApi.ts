import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api";

export const fetchApprovedDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors/approved`);
    return response.data;
  } catch (error) {
    console.error("Error fetching approved doctors:", error);
    return [];
  }
};
