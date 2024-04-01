import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useSubcategoryStore = defineStore("subcategory", {
  state: () => ({
    subcategories: [],
  }),

  getters: {
    getSubcategory: (state) => state.subcategories,
  },

  actions: {
    async findAllsubcategories(page, limit) {
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
          baseURL + "subcategories/find-all", params,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.subcategories = response.data.data;
        console.log("this.subcategories", this.subcategories)
      } catch (error) {
        throw error;
      }
    },
    async createSubcategory(name) {
      const params = {
        name: name
      }
      console.log(params)
      try {
        const response = await axios.post(
          baseURL + "subcategories/", params,
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

    },

    async disableSubcategory(id) {
      const params = {
        id: id
      }
      console.log(params)
      try {
        const response = await axios.put(
          baseURL + "subcategories/change-status", params,
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
    },

  }

});
