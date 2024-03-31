import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            email,
            password,
          }
        );
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
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
