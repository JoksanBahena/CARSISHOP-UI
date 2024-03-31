import {defineStore} from "pinia";
import axios from "axios";
import router from "@/router";

const baseURL = import.meta.env.VITE_BASE_URL;
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: {role: "admin"},
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
      this.user = null;
    },
  },
});
