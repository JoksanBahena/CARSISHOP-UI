import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useClotheStore = defineStore("clothe", {
  state: () => ({
    clothes: [],
  }),
  getters: {
    getClothes: (state) => state.clothes,

  },
  actions: {
    async finAllClothes(page, itemsPerPage, sortBy) {
      const params = {
        value: "",
        paginationType: {
          filter: "name",
          sortBy: "name",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };
      const url = baseURL + "clothes/find-all";
      console.log(url)
      console.log(params)
      try {
        const response = await axios.post(url, params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response", response.data.data)
        this.clothes = response.data.data;
      } catch (error) {
        throw error;
      }

    }
  }
}
);
