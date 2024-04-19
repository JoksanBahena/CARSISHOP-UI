<template>
  <default-layout>
    <breadcrumbs-component :items="items" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Carrito</p>
      <v-row>
        <v-col cols="12" lg="7" md="7">
          <v-row v-for="item in cartData.clothes.clothesCarts" :key="item.id">
            <v-col cols="12">
              <seller-card-component cart>
                <div class="d-flex justify-end mt-2">
                  <v-btn
                    variant="flat"
                    icon="mdi-close"
                    @click="deleteItem(item.id)"
                  />
                </div>
                <v-row class="align-center">
                  <v-col cols="12" lg="6" md="6">
                    <v-row class="align-center">
                      <v-col cols="12" lg="6" md="6">
                        <v-img
                          :src="item.clothes.images[0].url"
                          width="120"
                          class="mx-auto"
                        />
                      </v-col>
                      <v-col>
                        <p class="text-h6">{{ item.clothes.name }}</p>
                        <p class="text-subtitle-1 my-1">
                          {{ item.clothes.description }}
                        </p>
                        <p class="text-subtitle-1 my-1">
                          Talla: {{ item.size.name }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="7" lg="3" md="3">
                    <div class="text-subtitle-1 font-weight-medium">
                      Cantidad:
                    </div>
                    <v-text-field
                      type="number"
                      v-model="item.amount"
                      @change="updateItem(item.id, item.amount)"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                    <div class="d-flex">
                      <p class="text-subtitle-1 mt-2 mb-8 ml-2">
                        ${{ item.clothes.stock[0].price }}MX c/u
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="5" lg="3" md="3" align="center">
                    <p class="text-subtitle-1 font-weight-medium">Subtotal:</p>
                    <p class="text-h5 font-weight-medium mt-2 mb-8">
                      ${{
                        (item.clothes.stock[0].price * item.amount).toFixed(2)
                      }}MX
                    </p>
                  </v-col>
                  <v-divider class="mt-4" />
                </v-row>
              </seller-card-component>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col cols="12" lg="4" md="4">
          <v-card variant="flat">
            <v-card-title>Resumen de compra</v-card-title>
            <v-card-item>
              <div class="d-flex">
                <p>Total ({{ products }} productos):</p>
                <p class="ml-auto font-weight-medium">
                  ${{ price.toFixed(2) }} MXN
                </p>
              </div>
              <v-divider class="my-3" />
              <v-btn
                class="text-none"
                :color="colors.primary_dark"
                variant="flat"
                block
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
import { reactive, onMounted, ref, watch } from "vue";
import SellerCardComponent from "@/components/profile/SellerCardComponent.vue";
import BreadcrumbsComponent from "@/components/common/BreadcrumbsComponent.vue";
import ProductListComponent from "@/components/common/ProductListComponent.vue";
import { Toast } from "@/utils/Alerts";
import Swal from "sweetalert2";
const { fetchCart, deleteFromCart, updateFromCart } = useCartStore();

const cart = {
  clothes: [],
};

const products = ref(0);
const price = ref(0);

const cartData = reactive({ ...cart });
const loading = ref(true);

const getTotal = async () => {
  cartData.clothes = await fetchCart();
  products.value = cartData.clothes.clothesCarts.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  price.value = cartData.clothes.clothesCarts.reduce((acc, item) => {
    return acc + item.clothes.stock[0].price * item.amount;
  }, 0);
};

onMounted(async () => {
  getTotal();
  loading.value = true;
  try {
  } catch (error) {
    throw new Error("Error al obtener el carrito");
  } finally {
    loading.value = false;
  }
});

const deleteItem = async (id) => {
  try {
    const response = await deleteFromCart(id);
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Producto eliminado del carrito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al eliminar el producto",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    await getTotal();
  }
};
const updateItem = async (id, amount) => {
  if (amount <= 0) {
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Si la cantidad no es valida el producto será eliminado del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      await deleteItem(id);
    } else if (result.isDismissed) {
      //poner la cantidad en 1
      amount = 1;
    }
  }

  try {
    await updateFromCart(id, amount).then(() => {
      getTotal();
    });
  } catch (error) {
    await Toast.fire({
      icon: "error",
      title: "Error al actualizar el producto",
      showConfirmButton: false,
      timer: 1500,
    });
  }
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
