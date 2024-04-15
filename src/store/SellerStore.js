import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || "";

export const useSellerStore = defineStore("seller", {
  state: () => ({
    sellers: [],
    activeSellers: [],
  }),

  getters: {
    getSellers: (state) => state.sellers,
    getActiveSellers: (state) => state.activeSellers,
  },
  actions: {
    async findAllRequestSeller(page, itemsPerPage, sortBy) {
      const params = {
        value: "PENDING",
        paginationType: {
          filter: "request_status",
          sortBy: "request_status",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };
      const url = baseURL + "sellers/find-all";
      console.log(url)
      console.log(params)
      console.log(token)
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
        this.sellers = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async approveSeller(id, rfc, curp, user) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('rfc', rfc);
      formData.append('curp', curp);
      formData.append('user', user);
      formData.append('request_status', 'APPROVED');

      console.log(formData)

      try {
        const response = await axios.put(baseURL + "sellers/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
      } catch (error) {
        throw error;
      }
    },
    async rejectedSeller(id, rfc, curp, user) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('rfc', rfc);
      formData.append('curp', curp);
      formData.append('user', user);
      formData.append('request_status', 'REJECTED');

      console.log(formData)

      try {
        const response = await axios.put(baseURL + "sellers/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
      } catch (error) {
        throw error;
      }
    },
    async findAllActiveSeller(page, itemsPerPage, sortBy) {
      const params = {
        value: "APPROVED",
        paginationType: {
          filter: "request_status",
          sortBy: "request_status",
          order: sortBy?.order ? sortBy.order : "asc",
          page: page,
          limit: itemsPerPage,
        },
      };
      console.log(params)
      const url = baseURL + "sellers/find-all";
      console.log(url)
      try {
        const response = await axios.post(
          url,
          params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response", response.data.data)
        this.activeSellers = response.data.data;
      } catch (error) {
        throw error;
      }
    },
    async disbleSeller(id) {
      const params = {
        id: id,
      };
      try {
        const response = await axios.put(baseURL + "sellers/change-status", params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
      } catch (error) {
        throw error;

      }
    }
  }
});