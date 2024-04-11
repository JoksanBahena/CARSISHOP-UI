<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Resumen de cuenta</p>

    <resumen-card-component
      title="Mi cuenta"
      action="Editar"
      :to="{ name: 'ProfileAccount' }"
    >
      <user-profile-card-component v-bind:user="userData"/>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-shopping-outline"
      title="Ultima compra"
      :to="{ name: 'ProfileOrders' }"
    >
      <product-list-card-component />
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-map-marker-outline"
      title="Mi dirección"
      :to="{ name: 'ProfileAddresses' }"
    >
      <address-component
        user="Cristopher Soto Ventura"
        state="Morelos"
        town="Emiliano Zapata"
        suburb="Tetacalita"
        street="Calle del Déposito"
        extrnumber="S/N"
        intnumber="132"
        cp="62768"
        resume
      />
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-credit-card-outline"
      title="Métodos de pago"
      :to="{ name: 'ProfilePayments' }"
    >
      <payment-method-component resume />
    </resumen-card-component>
  </v-container>
</template>

<script setup>
import ResumenCardComponent from "@/components/profile/ResumenCardComponent.vue";
import { onMounted, reactive } from "vue";
import { useProfileStore } from '@/store/ProfileStore';

const { fetchProfile } = useProfileStore();

const userData = reactive({
  name: '',
  email: '',
  avatar: ''
});

const getUserInfo = async () => {
  try {
    const response = await fetchProfile();
    userData.name = response.name + ' ' + response.surname;
    userData.email = response.username;
    userData.avatar = response.profilepic;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getUserInfo();
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
