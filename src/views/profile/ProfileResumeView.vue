<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Resumen de cuenta</p>

    <resumen-card-component
      title="Mi cuenta"
      action="Ver cuenta"
      :to="{ name: 'ProfileAccount' }"
    >
      <v-expand-transition>
        <div v-if="!loading">
          <user-profile-card-component />
        </div>
      </v-expand-transition>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-shopping-outline"
      title="Ultima compra"
      action="Ver compras"
      :to="{ name: 'ProfileOrders' }"
    >
      <v-expand-transition>
        <div v-if="summary_data.clothes[0].name !== ''">
          <product-list-card-component
            :product="summary_data.clothes[0].name"
            :status="summary_data.clothes[0].status"
            :description="summary_data.clothes[0].description"
            :date="summary_data.clothes[0].date"
            :image="summary_data.clothes[0].image"
          />
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <v-card v-if="!loading">
          <div class="text-subtitle-1 mt-2 mb-4">
            No tienes compras registradas
          </div>
        </v-card>
      </v-expand-transition>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-map-marker-outline"
      title="Mis direcciones"
      :action="
        summary_data.address.name !== ''
          ? 'Ver direcciones'
          : 'Agregar dirección'
      "
      :to="{ name: 'ProfileAddresses' }"
    >
      <v-expand-transition>
        <div v-if="summary_data.address.id !== null">
          <address-component
            :id="summary_data.address.id"
            :user="summary_data.address.name"
            :state="summary_data.address.state.name"
            :town="summary_data.address.town.name"
            :suburb="summary_data.address.suburb"
            :street="summary_data.address.street"
            :extrnumber="summary_data.address.extnumber"
            :intnumber="summary_data.address.intnumber"
            :cp="summary_data.address.cp"
            resume
          />
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <v-card v-if="!loading && summary_data.address.id === null">
          <div class="text-subtitle-1 mt-2 mb-4">
            No tienes dirección registrada
          </div>
        </v-card>
      </v-expand-transition>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-credit-card-outline"
      title="Métodos de pago"
      :action="
        summary_data.card.owner !== '' ? 'Ver tarjetas' : 'Agregar tarjeta'
      "
      :to="{ name: 'ProfilePayments' }"
    >
      <v-expand-transition>
        <div v-if="summary_data.card.owner !== ''">
          <payment-method-component
            :user="summary_data.card.owner"
            :last_four="summary_data.card.last_four"
            resume
          />
        </div>
      </v-expand-transition>
      <v-expand-transition>
        <v-card v-if="!loading && summary_data.card.owner === ''">
          <div class="text-subtitle-1 mt-2 mb-4">
            No tienes tarjeta registrada
          </div>
        </v-card>
      </v-expand-transition>
    </resumen-card-component>
  </v-container>
</template>

<script setup>
import ResumenCardComponent from "@/components/profile/ResumenCardComponent.vue";
import { useProfileStore } from "@/store/ProfileStore";
import { reactive, onMounted, ref } from "vue";
import { decryptValue } from "@/utils/Crypto";

const { fetchOrders, fetchAddressess, fetchCards } = useProfileStore();

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const loading = ref(true);

const summary = {
  at: "",
  card: {
    owner: "",
    last_four: "",
  },
  address: {
    id: null,
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

const summary_data = reactive({ ...summary });

const initialInformation = async () => {
  try {
    const resp_order = await fetchOrders();
    const resp_address = await fetchAddressess();
    const resp_card = await fetchCards();

    if (resp_order !== null) {
      summary_data.clothes[0].name = resp_order.clothOrders[0].clothes.name;
      summary_data.clothes[0].description =
        resp_order.clothOrders[0].clothes.description;
      summary_data.clothes[0].status = resp_order.status;
      summary_data.clothes[0].date = formatDate(resp_order.at);
      summary_data.clothes[0].image =
        resp_order.clothOrders[0].clothes.images[0].url;
    }

    if (resp_address.length > 0) {
      summary_data.address.id = resp_address[0].id;
      summary_data.address.name = decryptValue(resp_address[0].name);
      summary_data.address.state.name = resp_address[0].state.name;
      summary_data.address.town.name = resp_address[0].town.name;
      summary_data.address.suburb = decryptValue(resp_address[0].suburb);
      summary_data.address.street = decryptValue(resp_address[0].street);
      summary_data.address.extnumber = decryptValue(resp_address[0].extnumber);
      summary_data.address.intnumber = decryptValue(resp_address[0].intnumber);
      summary_data.address.cp = decryptValue(resp_address[0].cp);
    }

    if (resp_card.length > 0) {
      summary_data.card.owner = decryptValue(resp_card[0].owner);
      summary_data.card.last_four = resp_card[0].lastFour;
    }
  } catch (error) {
    console.log("Error al obtener la información principal", error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loading.value = true;
  initialInformation();
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
