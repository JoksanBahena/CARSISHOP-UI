<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Resumen de cuenta</p>

    <resumen-card-component
      title="Mi cuenta"
      action="Editar"
      :to="{ name: 'ProfileAccount' }"
    >
      <user-profile-card-component />
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-shopping-outline"
      title="Ultima compra"
      :to="{ name: 'ProfileOrders' }"
    >
      <product-list-card-component
        v-if="orderData.clothes[0].name !== ''"
        :product="orderData.clothes[0].name"
        :status="orderData.clothes[0].status"
        :description="orderData.clothes[0].description"
        :date="orderData.clothes[0].date"
        :image="orderData.clothes[0].image"
      />
      <v-card v-else>
        <v-card-title class="text-h6"
          >No tienes compras registradas</v-card-title
        >
      </v-card>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-map-marker-outline"
      title="Mi dirección"
      :to="{ name: 'ProfileAddresses' }"
    >
      <address-component
        v-if="orderData.address.name !== ''"
        :user="orderData.address.name"
        :state="orderData.address.state.name"
        :town="orderData.address.town.name"
        :suburb="orderData.address.suburb"
        :street="orderData.address.street"
        :extnumber="orderData.address.extnumber"
        :intnumber="orderData.address.intnumber"
        :cp="orderData.address.cp"
        resume
      />
      <v-card v-else>
        <v-card-title class="text-h6"
          >No tienes dirección registrada</v-card-title
        >
      </v-card>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-credit-card-outline"
      title="Métodos de pago"
      :to="{ name: 'ProfilePayments' }"
    >
      <payment-method-component
        v-if="orderData.card.owner !== ''"
        :user="orderData.card.owner"
        :last_four="orderData.card.last_four"
        resume
      />
      <v-card v-else>
        <v-card-title class="text-h6"
          >No tienes tarjeta registrada</v-card-title
        >
      </v-card>
    </resumen-card-component>
  </v-container>
</template>

<script setup>
import ResumenCardComponent from "@/components/profile/ResumenCardComponent.vue";
import { useProfileStore } from "@/store/ProfileStore";
import { reactive, onMounted } from "vue";
import { Toast } from "@/utils/Alerts";
import { decryptValue } from "@/utils/Crypto";

const { fetchOrders } = useProfileStore();

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const order = {
  at: "",
  card: {
    owner: "",
    last_four: "",
  },
  address: {
    name: "",
    state: {
      name: "",
    },
    town: {
      name: "",
    },
    suburb: "",
    street: "",
    extnumber: "",
    intnumber: "",
    cp: "",
  },
  clothes: [
    {
      name: "",
      description: "",
      status: "",
      date: "",
      image: "",
    },
  ],
};

const orderData = reactive({ ...order });

const getOrder = async () => {
  try {
    const response = await fetchOrders();
    orderData.card.owner = decryptValue(response.card.owner);
    orderData.card.last_four = response.card.lastFour;
    orderData.address.name = response.address.name;
    orderData.address.state.name = response.address.state.name;
    orderData.address.town.name = response.address.town.name;
    orderData.address.suburb = response.address.suburb;
    orderData.address.street = response.address.street;
    orderData.address.extnumber = response.address.extnumber;
    orderData.address.intnumber = response.address.intnumber;
    orderData.address.cp = response.address.cp;
    orderData.clothes[0].name = response.clothOrders[0].clothes.name;
    orderData.clothes[0].description =
      response.clothOrders[0].clothes.description;
    orderData.clothes[0].status = response.status;
    orderData.clothes[0].date = formatDate(response.at);
    orderData.clothes[0].image = response.clothOrders[0].clothes.images[0].url;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getOrder();
});

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Perfil",
    href: "/profile",
  },
  {
    title: "Resumen",
  },
];
</script>
