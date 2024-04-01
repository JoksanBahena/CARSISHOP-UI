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
    async findAllCategories(page, limit) {
      const params = {
        value: "",
        paginationType: {
          filter: "name",
          sortBy: "name",
          order: "asc",
          page: page.toString(),
          limit: limit ? limit.toString() : "10"
        }
      }

      try {
        const response = await axios.post(
          baseURL + "categories/find-all", params,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.categories = response.data.data;
        console.log("this.categories", this.categories)
      } catch (error) {
        throw error;
      }
    },
    async createCategory(name) {
      const params = {
        name: name
      }
      console.log(params)
      try {
        const response = await axios.post(
          baseURL + "categories/", params,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("response", response)
      } catch (error) {
        throw error;
      }

    }
  }

});
