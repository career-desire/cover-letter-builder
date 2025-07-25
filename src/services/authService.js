import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`,
  withCredentials: true,
});

let accessToken = null;

// Set and get access token
export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Auto attach access token to requests
API.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token in API responses
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      console.warn("Access token expired. Refreshing...");
      const newToken = await refreshAccessToken();
      if (newToken) {
        setAccessToken(newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

// Refresh Access Token function
export const refreshAccessToken = async () => {
  try {
    const response = await API.post("/refresh");
    if (response.status === 200 && response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Refresh token failed:", error.response?.data?.message || error.message);
    return null;
  }
};

// Check login status function
export const checkLoginStatus = async (setToken) => {
  try {
    let token = getAccessToken();

    if (!token) {
      token = await refreshAccessToken();
      if (!token) return null;
      setToken(token);
    }

    const response = await API.get("/me");
    return response.data.user;
  } catch (error) {
    console.error("User is not logged in:", error.response?.data?.message || error.message);
    return null;
  }
};

// Login function
export const loginUser = async (loginForm, setToken) => {
  try {
    const response = await API.post("/login", loginForm);
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      setToken(response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Login failed. Please try again.";
    console.error("Login error:", errorMessage);
    throw new Error(errorMessage); // Throw an error object with the message
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await API.post("/logout");
    setAccessToken(null);
  } catch (error) {
    console.error("Logout failed:", error.response?.data?.message || error.message);
  }
};