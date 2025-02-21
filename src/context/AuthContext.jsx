import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  //로그인 여부 state
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  //로그인 후 로컬스토리지에 토큰 저장하는 함수
  const addTokenInLocal = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };
  //로그아웃 로그인 후 로컬스토리지에 토큰 삭제하는 함수
  const removeTokenInLocal = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, addTokenInLocal, removeTokenInLocal }}
    >
      {children}
    </AuthContext.Provider>
  );
};
