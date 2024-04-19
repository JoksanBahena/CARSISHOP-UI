<template>
  <default-layout>
    <breadcrumbs-component :items="items" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Carrito</p>
      <v-row>
        <v-col cols="12" lg="9" md="9">
          <v-row v-for="item in cartData.clothes" :key="item.id">
            <v-col cols="12">
              <seller-card-component cart
              :title="item.seller.user.name">
                <product-list-cart-component
                  :deleteItem="deleteItem"
                  :id="product.id"
                  v-for="product in item.clothesCart"
                  :key="product.id"
                  :image="product.clothes.images[0].url"
                  :product="product.clothes.name"
                  :description="product.clothes.description"
                  :size="product.clothes.stock[0].size.name"
                  :price="product.clothes.stock[0].price"
                  :amount="product.amount"
                />
              </seller-card-component>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="3" md="3">
          <v-card variant="flat">
            <v-card-title>Resumen de compra</v-card-title>
            <v-card-item>
              <p>Total ({{ totalItems }} productos): ${{ totalPrice }} MXN</p>
              <v-divider class="my-3" />
              <v-btn
                class="text-none"
                :color="colors.primary_dark"
                variant="flat"
                block
                :to="{ name: 'Payment' }"

              >
                Continuar compra
              </v-btn>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <product-list-component title="También te puede interesar" />
    </v-container>
  </default-layout>
</template>
<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import Colors from "@/utils/Colors.js";
import { useCartStore } from "@/store/CartStore";
import { reactive, onMounted, ref } from "vue";
import ProductListCartComponent from "@/components/common/ProductListCartComponent.vue";
import SellerCardComponent from "@/components/profile/SellerCardComponent.vue";
import BreadcrumbsComponent from "@/components/common/BreadcrumbsComponent.vue";
import ProductListComponent from "@/components/common/ProductListComponent.vue";
import Swal from "sweetalert2";

const { fetchCart, deleteFromCart } = useCartStore();

const cart = {
  clothes: []
}

const cartData = reactive({ ...cart });
const loading = ref(false);
let totalItems = ref(0);
const totalPrice = ref(0);

const getCart = async () => {
  loading.value = true;
  try {
    const response = await fetchCart();
    cartData.clothes = response;
    loading.value = false;
    console.log(response);
  } catch (error) {
    loading.value = false;
    throw new Error("Error al obtener el carrito");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getCart().then(() => {
    calculateTotals();
  });
});

const deleteItem = async (id) => {
  try {
    const response = await deleteFromCart(id);
    if (response.status === 200) {
      await getCart();
      await Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      await Swal.fire({
        icon: "error",
        title: "Error al eliminar el producto",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error al eliminar el producto",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const calculateTotals = async () => {
  let itemsCount = 0;
  let totalPriceValue = 0;
  cartData.clothes.forEach(item => {
    console.log(item);
    itemsCount += item.clothesCart.reduce((acc, product) => acc + product.amount, 0);
    totalPriceValue += item.clothesCart.reduce((acc, product) => acc + (product.amount * product.clothes.stock[0].price), 0);
  });
  totalItems.value = itemsCount;
  totalPrice.value = totalPriceValue;
};

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Carrito",
  },
];
</script>
