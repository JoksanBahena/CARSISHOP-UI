import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_BASE_URL;
// console.log("baseURL", baseURL)
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    tokenExpiration: localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).exp : "",
    user: localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).role : "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(
          baseURL + "auth/login",
          {
            email,
            password,
          }
        );
        this.token = response.data.data.token;
        localStorage.setItem("token", this.token)
        router.push("/");
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = "";
      localStorage.removeItem("token");
      this.user = null;
      this.tokenExpiration = null;
    },
  },
});
