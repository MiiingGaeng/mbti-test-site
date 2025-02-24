import { authApi } from "./axios";

export const register = async (userData) => {
  const response = await authApi.post("/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await authApi.post("/login", userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await authApi.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export const updateProfile = async (formData) => {
  const userToken = localStorage.getItem("accessToken");
  const response = await authApi.patch("/profile", formData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return response;
};
