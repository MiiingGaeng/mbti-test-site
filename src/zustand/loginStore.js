import { create } from "zustand";
import { getUserProfile } from "../api/auth";

const useLoginStore = create((set) => {
  return {
    isAuthenticated: !!localStorage.getItem("accessToken"),
    user: null,
    addTokenInLocal: (token) => {
      localStorage.setItem("accessToken", token);
      set({ isAuthenticated: true });
    },
    removeTokenInLocal: () => {
      localStorage.clear();
      set({ isAuthenticated: false });
    },
    fetchUserData: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await getUserProfile(token);
        set({ user: response.data });
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      }
    }
  };
});

export default useLoginStore;
