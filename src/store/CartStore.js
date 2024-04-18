import { defineStore } from "pinia";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useCartStore = defineStore("cart", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    cart: {
      clothesCarts: [
      ],
    },
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
        this.cart = this.groupClothesBySeller(response.data.data.clothesCarts);
        return this.cart;
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart(clotheId, amount, sizeId) {
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
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    groupClothesBySeller(clothes){
      const groupedClothes = clothes.reduce((acc, curr) => {
        const sellerId = curr.clothes.seller.id;
        if (!acc[sellerId]) {
          acc[sellerId] = {
            seller: curr.clothes.seller,
            clothesCart: [],
          };
        }
        acc[sellerId].clothesCart.push(curr);
        return acc;
      }, {});
      return Object.values(groupedClothes);
    }
  },
});
