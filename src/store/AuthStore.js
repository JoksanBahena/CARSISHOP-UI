import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    tokenExpiration: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token")).exp
      : "",
    user: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token")).role
      : "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(baseURL + "auth/login", {
          email,
          password,
        });
        this.token = response.data.data.token;
        localStorage.setItem("token", this.token);
        return response.data;
      } catch (error) {
        return error.response.data.message;
      }
    },
    ////
    async captcha(solution) {
      try {
        const response = await axios.post(
          baseURL + "auth/captcha/?solution=" + solution
        );
        return response.data;
      } catch (error) {
        throw new Error("error captcha");
      }
    },
    async register(user) {
      try {
        const response = await axios.post(baseURL + "auth/register", user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async forgotPassword(email) {
      try {
        const response = await axios.post(baseURL + "auth/forgotPassword", {
          email,
        });
        return response.data;
      } catch (error) {
        throw new Error("error");
      }
    },
    async resetPassword(token, newPassword, confirmNewPassword) {
      try {
        const response = await axios.post(
          baseURL + "auth/resetPassword/" + token,
          {
            newPassword,
            confirmNewPassword,
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("error");
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
