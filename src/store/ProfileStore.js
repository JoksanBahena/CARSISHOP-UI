import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    profile: {},
    admins: [],
  }),
  getters: {
    getProfile: (state) => state.profile,
    getAdmins: (state) => state.admins,
    getId: (state) => state.profile.id,
    getImage: (state) => state.profile.profilepic,
  },
  actions: {
    async fetchProfile() {
      try {
        const username = jwtDecode(localStorage.getItem("token")).sub;
        const response = await axios.post(baseUrl + "users/info", username, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.profile = response.data.data;
        return this.profile;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProfile(profile) {
      try {
        const response = await axios.post(
          baseUrl + "users/updateInfo",
          profile,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.profile = response.data.data;
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async updateProfileImage(profilePic) {
      try {
        const response = await axios.put(
          baseUrl + "users/updateProfilePic",
          profilePic,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.profile = response.data.data;
        return response.data;
      } catch (err) {
        console.log(err);
        throw new Error("Error al actualizar imagen de perfil");
      }
    },
    async updateSellerProfile(seller) {
      try {
        const response = await axios.put(baseUrl + "sellers/", seller, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async createAdmin(
      name,
      surname,
      username,
      phone,
      birthdate,
      password,
      gender
    ) {
      const params = {
        name: name,
        surname: surname,
        username: username,
        phone: phone,
        birthdate: birthdate,
        password: password,
        gender: gender,
      };

      try {
        const response = await axios.post(
          baseUrl + "users/register-admin",
          params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        console.log("Response from server:", response.data);

        return response.data;
      } catch (error) {
        console.error("Error creating admin:", error);
        throw new Error("Error creating admin");
      }
    },
    async findAllAdmins(page, itemsPerPage, sortBy) {
      const params = {
        value: "ADMIN",
        paginationType: {
          filter: sortBy?.key ? sortBy.key : "role",
          sortBy: sortBy?.key ? sortBy.key : "role",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };
      try {
        const response = await axios.post(baseUrl + "users/find-all", params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.admins = response.data.data;
        return this.admins;
      } catch (error) {
        throw error;
      }
    },
  },
});
