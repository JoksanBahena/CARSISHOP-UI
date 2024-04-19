<template>
	<default-layout>
		<breadcrumbs-component :items="items" />
		<v-container>
			<p class="text-h4 font-weight-medium mb-2">Finalizar compra</p>
			<v-row>
				<v-col cols="12" lg="9" md="9">
					<address-info-component />
				</v-col>
				<v-col cols="12" lg="3" md="3">
					<v-card variant="flat">
						<v-card-title>Resumen de compra</v-card-title>
						<v-card-item>
							<p>Total (0 productos): $0.00 MXN</p>
							<v-divider class="my-3" />
							<v-btn
								class="text-none"
								:color="colors.primary_dark"
								variant="flat"
								block
								:disabled="isDisabled"
								@click="checkout"
							>
								Pagar ahora
							</v-btn>
						</v-card-item>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<product-list-component title="También te puede interesar" />
	</default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/user/DefaultLayout.vue';
import Colors from '@/utils/Colors.js';
import { onMounted, ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useProfileStore } from '@/store/ProfileStore';
import { usePaymentStore } from '@/store/PaymentStore';

const { profile } = useProfileStore();
const { createPayment } = usePaymentStore();

const isDisabled = ref(false);

let stripe = '';

const redirect = async (price) => {
	try {
		//Hacer la peticion al back para crear la orden:
		//
		//

		//Se hace el pago
		await stripe.redirectToCheckout({
			successUrl: 'http://localhost:3000/profile/orders',
			cancelUrl: 'http://localhost:3000/cart/payment',
			lineItems: [
				{
					price: price,
					quantity: 1,
				},
			],
			mode: 'payment',
			customerEmail: profile.username,
		});

	} catch (e) {
		console.log(e);
	}
};

const checkout = async () => {
	isDisabled.value = true;

	const response = await createPayment({
		amount: 1000.0,
		productName: 'Compra de ' + profile.name,
	});

	if (response) {
		const product = response;

		await redirect(product);
	} else {
		isDisabled.value = false;
	}
};

onMounted(async () => {
	stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
});

const colors = {
	primary: Colors.cs_primary,
	primary_dark: Colors.cs_primary_dark,
	white: Colors.cs_white,
	secondary: Colors.cs_secondary,
};

const items = [
	{
		title: 'Inicio',
		to: { name: 'Home' },
	},
	{
		title: 'Carrito',
		to: { name: 'Cart' },
	},
	{
		title: 'Finalizar compra',
	},
];
</script>
