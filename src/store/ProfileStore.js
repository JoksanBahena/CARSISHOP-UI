import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    profile: {},
  }),
  getters: {
    getProfile: (state) => state.profile,
  },
  actions: {
    async fetchProfile() {
      try {
        const username = jwtDecode(this.token).sub;
        const params = { username: username };
        const response = await axios.post(baseUrl + "users/info", params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.profile = response.data.data;
        return this.profile;
      } catch (error) {
        throw new Error("Error fetching profile");
      }
    },
    async updateProfile(state) {
      try {
        const response = await axios.post(
          baseUrl + "users/updateInfo",
          {
            name: state.name,
            surname: state.surname,
            username: state.email,
            phone: state.phone,
            gender: state.genere,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.profile = response.data;
        return this.profile;
      } catch (err) {
        console.log(err);
        throw new Error("Error al actualizar información");
      }
    },
  },
});
