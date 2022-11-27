// Services - used for making http requests, sending data back,
// and setting data in local storage

import axios from "axios";

const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
  // store the JSON response from the server
  const response = await axios.post(API_URL, userData);

  // Axios puts the data into an object called data
  // check if the data object exists within the response object initialized ^^^
  if (response.data) {
    // convert the JSON reponse to string to be stored as 'user' in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// functions to be exported
const authService = {
  register,
};

// export
export default authService;
