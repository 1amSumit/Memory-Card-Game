import axios from "axios";

export const registerUser = async ({ username }) => {
  const API_URL = "http://localhost:8080/api/v1/registeruser";
  try {
    const res = await axios.post(
      API_URL,
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
