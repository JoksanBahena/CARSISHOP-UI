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
        const response = await axios.delete(
          baseUrl + "address/delete",
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
        throw new Error("Error deleting address");
      }
    },
  },
});
