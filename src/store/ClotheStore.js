import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useClotheStore = defineStore("clothe", {
  state: () => ({
    activeClothes: [],
  }),
  getters: {
    getActiveClothes: (state) => state.activeClothes,

  },
  actions: {
  }
}
);
