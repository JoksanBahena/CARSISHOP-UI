import { defineStore } from 'pinia';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const usePaymentStore = defineStore('payment', {
	state: () => ({
		token: localStorage.getItem('token') || '',
		payment: {},
	}),

	getters: {
		createApp: (state) => state.payment,
	},

	actions: {
		async createPayment(payload) {
			const response = await axios.post(`${baseURL}payment/`, payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.token}`,
				},
			});
			this.payment = response.data.data;
			return response.data.data;
		},
    async confirmOrder(id, address, card){
      console.log(id, address, card)
      try{
          const response = await axios.post(`${baseURL}payment/confirm-order/`, {id, address, card}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.token}`,
            },
          });
        console.log(response.data.data)
          return response.data.data;
      }catch (error){
        console.log(error)
      }
    }
	},
});
