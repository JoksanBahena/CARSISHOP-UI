import {defineStore} from "pinia";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";

const baseURL = import.meta.env.VITE_BASE_URL;
const route = useRouter();
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
    async verifyTokenExp() {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if(this.tokenExpiration && this.tokenExpiration < currentTimeInSeconds) {
        Swal.fire({
          icon: "error",
          title: "La sesión ha expirado",
          text: "Por favor inicie sesión nuevamente",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
        }).then(() => {
          this.logout();
          route.push("/login")
        });
      }
    },
    async login(email, password) {
      try {
        const response = await axios.post(baseURL + "auth/login", {
          email,
          password,
        });
        this.token = response.data.data.token;
        localStorage.setItem("token", this.token);
        this.tokenExpiration = jwtDecode(this.token).exp;
        this.user = jwtDecode(this.token).role;
        return response.data;
      } catch (error) {
        throw error.response;
      }
    },
    async captcha(solution) {
      try {
        const response = await axios.post(
          baseURL + "captcha/verifyCaptcha?solution=" + solution
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
        throw error.response.data;
      }
    },
    async confirm(token) {
      try {
        const response = await axios.post(baseURL + "auth/confirm/" + token);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async resend(email) {
      try {
        const response = await axios.post(baseURL + "auth/resend-confirm", {
          email,
        });
        console.log(response)
        return response.data;
      } catch (error) {
        throw error.response;
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
