import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useCartStore = defineStore("cart", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    cart: {},
  }),
  getters: {
    getCart: (state) => state.cart,
  },
  actions: {
    async fetchCart() {
      try {
        const response = await axios.get(baseURL + "clothesCart/findByUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data.data);
        this.cart = response.data.data.clothesCarts;
        return this.cart;
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart(clotheId) {
      try {
        const response = await axios.post(
          baseURL + "cart",
          {
            clotheId: clotheId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.cart = response.data.data;
        return this.cart;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFromCart(clotheId) {
      try {
        const response = await axios.delete(baseURL + `cart/${clotheId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.cart = response.data.data;
        return this.cart;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
