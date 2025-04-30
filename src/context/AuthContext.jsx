import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus, loginUser, logoutUser, registerUser } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "./AlertContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const { setAlert, setAlertMessage } = useContext(AlertContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Restore session if login below 7 days
  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      const userData = await checkLoginStatus(setToken);
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  // Register function with enhanced error handling
const register = async (registerForm) => {
  try {
    const response = await API.post("/register", registerForm);
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Registration failed. Please try again.";
    console.error("Registration error:", errorMessage);
    throw new Error(errorMessage); // Throw an error object with the message
  }
};

  // Login function with enhanced error handling
  const login = async (loginForm) => {
    try {
      const loginData = await loginUser(loginForm, setToken);

      if (loginData.accessToken) {
        setToken(loginData.accessToken);
        setUser(loginData.user);
        setAlert("success");
        setAlertMessage("Login successfully!");

        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);

      const errorMessage =
        error?.response?.data?.message || error.message || "Login failed. Please try again.";

      setAlert("failed");
      setAlertMessage(errorMessage);
      console.log(error);
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setToken(null);
      setAlert("success");
      setAlertMessage("Logout successfully!");
      navigate("/");
    } catch (error) {
      setAlert("failed");
      setAlertMessage(error.message || "Logout failed!");
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
