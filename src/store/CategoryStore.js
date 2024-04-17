import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
  }),

  getters: {
    getCategories: (state) => state.categories,
  },

  actions: {
    async findAllCategories(page, itemsPerPage, sortBy) {
      const params = {
        value: "",
        paginationType: {
          filter: sortBy?.key ? sortBy.key : "name",
          sortBy: sortBy?.key ? sortBy.key : "name",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };

      try {
        const response = await axios.post(
          baseURL + "categories/find-all",
          params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.categories = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async createCategory(name) {
      const params = {
        name: name,
      };
      try {
        const response = await axios.post(baseURL + "categories/", params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateCategory(id, name) {
      const params = {
        id: id,
        name: name,
      };
      try {
        const response = await axios.put(baseURL + "categories/", params, {
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
    async disableCategory(id) {
      const params = {
        id: id,
      };
      try {
        const response = await axios.put(
          baseURL + "categories/change-status",
          params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
