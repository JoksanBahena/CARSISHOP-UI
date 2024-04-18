<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Métodos de pago</p>

    <v-expand-transition>
      <v-row v-if="!loading">
        <payment-method-component
          v-for="card in cards"
          :key="card.id"
          :id="card.id"
          :user="card.owner"
          :last_four="card.last_four"
          :onDeleteHandle="cardDelete"
        />
      </v-row>
    </v-expand-transition>

    <v-expand-transition>
      <v-row v-if="!loading && cards.length === 0">
        <orders-not-found-component
          icon="mdi-credit-card-off-outline"
          advise="No tienes métodos de pago registradas"
          recomendation="Agrega un método de pago para poder realizar tus compras"
          disableActions
        />
      </v-row>
    </v-expand-transition>

    <v-btn
      variant="flat"
      class="mb-8 mt-10 text-none"
      :color="colors.primary_dark"
      block
      prepend-icon="mdi-plus"
      :to="{ name: 'ProfileAddPayment' }"
    >
      Agregar método de pago
    </v-btn>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { useProfileStore } from "@/store/ProfileStore";
import { ref, onMounted, reactive } from "vue";
import { Toast } from "@/utils/Alerts";
import { decryptValue, encryptAES } from "@/utils/Crypto";
import Swal from "sweetalert2";

const { fetchCards, deleteCard } = useProfileStore();

const cards = reactive([]);
const loading = ref(true);

const getCards = async () => {
  try {
    const response = await fetchCards();
    cards.splice(0);
    response.forEach((card) => {
      cards.push({
        id: card.id,
        owner: decryptValue(card.owner),
        last_four: card.lastFour,
      });
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Ocurrió un error al cargar tus tarjetas",
    });
  } finally {
    loading.value = false;
  }
};

const cardDelete = async (id) => {
  try {
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Este método de pago será eliminado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const response = await deleteCard(encryptAES(String(id)));
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tarjeta eliminada correctamente",
        });
      }
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Ocurrió un error al eliminar la tarjeta",
    });
  } finally {
    getCards();
  }
};

onMounted(() => {
  loading.value = true;
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
