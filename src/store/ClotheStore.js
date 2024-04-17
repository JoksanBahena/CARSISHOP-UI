import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useClotheStore = defineStore("clothe", {
  state: () => ({
    clothes: [],
    pendingClothes: [],
    clothe: [],
    clothesByCategory: [],
  }),
  getters: {
    getClothes: (state) => state.clothes,
    getPendingClothes: (state) => state.pendingClothes,
    getClothe: (state) => state.clothe,
  },
  actions: {
    async findAllClothes(page, itemsPerPage, sortBy) {
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
      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.clothes = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async findAllClothesHome() {
      const params = {
        value: "APPROVED",
        paginationType: {
          filter: "request_status",
          sortBy: "name",
          order: "asc",
          page: 0,
          limit: 100,
        },
      };
      const url = baseURL + "clothes/find-all";

      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.clothes = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async findClotheById(id) {
      const url = baseURL + `clothes/getOne/${id}`;
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.clothe = response.data.data;
        return response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async findAllClothesByCategory(category) {
      const url = baseURL + `clothes/getByCategory/${category}`;
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.clothesByCategory = response.data.data;
        return response.data.data;
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
      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
    async imagesClothe(payload) {
      console.log(payload);
      const url = baseURL + "images/addImages";
      try {
        const response = await axios.put(url, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
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
      const url = baseURL + "clothes/isAccepted";
      try {
        const response = await axios.post(url, params, {
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
    async rejectClothe(id) {
      const params = {
        id: id,
        request_status: "REJECTED",
      };
      const url = baseURL + "clothes/isAccepted";

      try {
        const response = await axios.post(url, params, {
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
    async fetchClothesBySellerId(sellerId) {
      const params = {
        sellerId: sellerId,
      };
      const url = baseURL + "clothes/findAllBySeller";
      try {
        const response = await axios.post(url, params, {
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
  },
});
