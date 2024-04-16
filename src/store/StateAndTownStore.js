import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useStateAndTownStore = defineStore("stateAndTown", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    states: [],
    towns: [],
  }),
  getters: {
    getStates: (state) => state.states,
    getTowns: (state) => state.towns,
  },
  actions: {
    async fetchStates() {
      try {
        const response = await axios.get(baseUrl + "state/findAll", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.states = response.data.data;
        return this.states;
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching states");
      }
    },
  },
});
