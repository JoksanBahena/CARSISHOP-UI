<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Métodos de pago</p>

    <v-row v-if="cards.length > 0" v-for="card in cards" :key="card.id">
      <payment-method-component
        :id="card.id"
        :user="card.owner"
        :last_four="card.last_four"
        :onDeleteHandle="cardDelete"
      />
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card variant="flat" class="text-center">
          <v-card-title class="text-h6">No tienes tarjetas registradas</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      variant="flat"
      class="mb-8 mt-10 text-none"
      :color="colors.primary_dark"
      block
      prepend-icon="mdi-plus"
      :to="{ name: 'ProfileAddPayment' }"
    >
      Agregar nueva tarjeta
    </v-btn>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { useProfileStore } from "@/store/ProfileStore";
import { ref, onMounted, reactive } from "vue";
import { Toast } from "@/utils/Alerts";
import { decryptValue, encryptAES } from "@/utils/Crypto";

const { fetchCards, deleteCard } = useProfileStore();

const cards = reactive([]);
const loading = ref(false);

const getCards = async () => {
  try {
    const response = await fetchCards();
    response.forEach(card => {
      cards.push({
        id: card.id,
        owner: decryptValue(card.owner),
        last_four: card.lastFour,
      });
    })
    loading.value = false;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Ocurrió un error al cargar tus tarjetas",
    });
    loading.value = false;
  } finally {
    loading.value = false;
  }
};

const cardDelete = async (id) => {
  loading.value = true;
  try {
    const response = await deleteCard(encryptAES(String(id)));
    window.location.reload();
    if(response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Tarjeta eliminada",
      });
      loading.value = false;
      getCards();
    }
  } catch (error) {
    loading.value = false;
    Toast.fire({
      icon: "error",
      title: "Ocurrió un error al eliminar la tarjeta",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getCards();
});

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Perfil",
    to: { name: "ProfileSummary" },
  },
  {
    title: "Metodos de pago",
  },
];
</script>
