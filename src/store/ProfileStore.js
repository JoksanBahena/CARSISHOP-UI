import { defineStore } from "pinia";
import axios from "axios";
import { AsyncCompiler } from "sass";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    profile: {},
    addressess: [],
    admins: [],
  }),
  getters: {
    getProfile: (state) => state.profile,
    getAddressess: (state) => state.addressess,
    getAdmins: (state) => state.admins,
  },
  actions: {
    async fetchProfile() {
      try {
        const response = await axios.post(
          baseUrl + "users/info",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.profile = response.data.data;
        return this.profile;
      } catch (err) {
        throw err;
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
        throw err;
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
    async fetchAddressess() {
      try {
        const response = await axios.get(baseUrl + "address/getByUser", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.addressess = response.data.data;
        return this.addressess;
      } catch (error) {
        throw new Error("Error fetching addresses");
      }
    },
    async deleteAddress(id) {
      const params = {
        id: id,
      };

      try {
        const response = await axios.post(baseUrl + "address/delete", params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log("Error deleting address:", error);
        throw new Error("Error deleting address");
      }
    },
    async registerAddress(address) {
      console.log("address", address);
      try {
        const response = await axios.post(
          baseUrl + "address/register",
          address,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log("Error registering address:", error);
        throw new Error("Error registering address");
      }
    },
    async fetchCards() {
      try {
        const response = await axios.get(baseUrl + "card/get", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data.data;
      } catch (error) {
        throw new Error("Error fetching cards");
      }
    },
    async registerCard(card) {
      try {
        const response = await axios.post(baseUrl + "card/register", card, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error("Error registering card");
      }
    },
    async deleteCard(id) {
      const params = {
        id: id,
      };

      try {
        const response = await axios.post(baseUrl + "card/delete", params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error("Error deleting card");
      }
    },
  },
});
