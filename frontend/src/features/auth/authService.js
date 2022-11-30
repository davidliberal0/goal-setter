// Services - used for making http requests, sending data back,
// and setting data in local storage

import axios from "axios";

// register users endpoint
const API_URL_USERS = "/api/users/";
// login users endpoint
const API_URL_LOGIN = "api/users/login";

// Register User
const register = async (userData) => {
  // store the JSON response from the server
  const response = await axios.post(API_URL_USERS, userData);

  // Axios puts the data into an object called data
  // check if the data object exists within the response object initialized ^^^
  if (response.data) {
    // convert the JSON reponse to string to be stored as 'user' in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  // store the JSON response from the server
  const response = await axios.post(API_URL_LOGIN, userData);

  // Axios puts the data into an object called data
  // check if the data object exists within the response object initialized ^^^
  if (response.data) {
    // convert the JSON reponse to string to be stored as 'user' in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
};

// functions to be exported
const authService = {
  register,
  logout,
  login,
};

// export
export default authService;
