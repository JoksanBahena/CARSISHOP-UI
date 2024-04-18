<template>
  <breadcrumbs-component :items="items" />
  <sales-form-component v-if="!loading" />
</template>

<script setup>
import SalesFormComponent from "@/components/profile/Form/SalesFormComponent.vue";
import { useProfileStore } from "@/store/ProfileStore";
import router from "@/router";
import { onMounted, ref } from "vue";

const { profile } = useProfileStore();

const loading = ref(true);

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
    title: "Ventas",
    to: { name: "SellerSales" },
  },
  {
    title: "Solicitud de vendedor",
  },
];

onMounted(() => {
  loading.value = true;
  if (profile.seller?.request_status === "APPROVED") {
    router.push({ name: "SellerResumen" });
  } else {
    loading.value = false;
  }
});
</script>
