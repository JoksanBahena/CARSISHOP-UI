import {defineStore} from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useCartStore = defineStore("cart", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    cart: {
      clothesCarts: [
      ],
      totalItems: 0,
      totalPrice: 0,
    },
  }),
  getters: {
    getCart: (state) => state.cart,
    getTotalItems: (state) => state.cart.totalItems,
    getTotalPrice: (state) => state.cart.totalPrice,
  },
  actions: {
    async fetchCart() {
      try {
        const response = await axios.get(baseURL + "clothesCart/findByUser", {
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
    async addToCart(clotheId, amount, sizeId) {
      console.log(clotheId, amount, sizeId)
      const cloth = {
        id: clotheId,
      }
      const size = {
        id: sizeId,
      }
      try {
        const response = await axios.post(
          baseURL + "clothesCart/add",
          {
            cloth,
            amount: amount,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFromCart(clotheId) {
      try {
        const response = await axios.post(baseURL + "clothesCart/delete",
          {
          id:clotheId,
          },
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response)
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async updateFromCart(id, amount){
        try{
          return await axios.post(baseURL + "clothesCart/update",
            {
              id: id,
              amount: amount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
        } catch (error) {
          console.log(error);
        }
    },
    setTotalItems(totalItems) {
      this.cart.totalItems = totalItems;
    },
    setTotalPrice(totalPrice) {
      this.cart.totalPrice = totalPrice;
    },
  },
});
