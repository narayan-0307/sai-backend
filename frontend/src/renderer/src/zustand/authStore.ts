import { create } from "zustand";
import { User } from "@renderer/types";

type AuthStore = {
  user: User | null;
  login: (userData: User) => void; // Define the login function
  logout: () => void;
};

// Read user data from local storage, or set it to null if not found
const initialUser = JSON.parse(localStorage.getItem("user") || "null");
// console.log(initialUser);

export const useAuthStore = create<AuthStore>((set) => ({
  user: initialUser, // Initialize user as null initially
  login: (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
