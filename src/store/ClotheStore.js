import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useClotheStore = defineStore("clothe", {
  state: () => ({
    clothes: [],
    pendingClothes: [],
  }),
  getters: {
    getClothes: (state) => state.clothes,
    getPendingClothes: (state) => state.pendingClothes,
  },
  actions: {
    async finAllClothes(page, itemsPerPage, sortBy) {
      const params = {
        value: "APPROVED",
        paginationType: {
          filter: "request_status",
          sortBy: "name",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };
      const url = baseURL + "clothes/find-all";
      console.log(url);
      console.log(params);
      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response", response.data.data);
        this.clothes = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async findAllRequestClothe(page, itemsPerPage, sortBy) {
      const params = {
        value: "PENDING",
        paginationType: {
          filter: "request_status",
          sortBy: "name",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };
      const url = baseURL + "clothes/find-all";
      console.log(url);
      console.log(params);
      console.log(token);
      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response", response.data.data);
        this.pendingClothes = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async createClothe(clothe) {
      const url = baseURL + "clothes/create";
      try {
        const response = await axios.post(url, clothe, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async approveClothe(id) {
      const params = {
        id: id,
        request_status: "APPROVED",
      };
      console.log(params);
      const url = baseURL + "clothes/isAccepted";
      console.log(url);
      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response APPROVED", response);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async rejectClothe(id) {
      const params = {
        id: id,
        request_status: "REJECTED",
      };
      console.log(params);
      const url = baseURL + "clothes/isAccepted";

      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response rejected", response);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
