<template>
  <v-row class="justify-center mb-16">
    <v-col cols="auto" class="ma-0 pa-0">
      <div class="d-flex flex-column flex-lg-row flex-md-row">
        <v-slide-group show-arrows>
          <div class="d-flex flex-row flex-lg-column flex-md-column">
            <v-img
              v-for="(image, index) in imagesArray"
              :key="index"
              :lazy-src="image ? image?.url || defaultImage : defaultImage"
              :src="image ? image?.url || defaultImage : defaultImage"
              aspect-ratio="1"
              class="bg-grey-lighten-2 my-2 mx-1"
              width="80"
              @mouseenter="updateMainImage(index)"
              @mouseover="hoverImage = index"
              :style="{
                border:
                  hoverImage === index
                    ? '3px solid ' + colors.bg_color
                    : 'none',
              }"
            >
              <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                  <v-progress-circular :color="colors.bg_color" indeterminate />
                </v-row>
              </template>
            </v-img>
          </div>
        </v-slide-group>
        <div class="d-flex ma-2">
          <v-img
            :aspect-ratio="1"
            class="bg-grey-lighten-2"
            :src="mainImage"
            width="500"
          >
            <template v-slot:placeholder>
              <v-row align="center" class="fill-height ma-0" justify="center">
                <v-progress-circular color="grey-lighten-5" indeterminate />
              </v-row>
            </template>
          </v-img>
        </div>
      </div>
    </v-col>
    <v-col>
      <h4 class="text-h4 font-weight-medium">{{ clotheName }}</h4>

      <div class="d-flex mb-4">
        <span class="my-2">{{ rating }}</span>
        <v-rating
          v-model="rating"
          class="ma-1"
          density="compact"
          color="yellow-darken-3"
        />
      </div>

      <div class="d-flex align-end mb-2">
        <h4
          class="text-h4 font-weight-medium mr-2"
          :style="{ color: colors.red }"
        >
          {{ selection ? `$MX${clothePrice}` : "Selecciona una talla" }}
        </h4>
      </div>

      <p>
        {{ clotheDescription }}
      </p>

      <div class="my-4">
        <p class="text-subtitle-1 font-weight-bold">Talla</p>
        <v-chip-group
          v-model="selection"
          selected-class="text-white bg-indigo-darken-4"
          mandatory
        >
          <v-chip
            v-for="size in clotheSizes"
            :key="size.id"
            :value="size.size.name"
            :disabled="size.quantity === 0"
            :variant="getChipVariant(size)"
            class="px-4"
            @click="selectSize(size.size.name)"
          >
            {{ size.size.name }} ({{ size.quantity }} disponibles)
          </v-chip>
        </v-chip-group>
      </div>
      <div class="my-4">
        <p class="text-subtitle-1 font-weight-bold">Cantidad</p>
        <v-text-field
          v-model="amount"
          class="mt-2"
          dense
          outlined
          type="number"
          :disabled="!selection"
        ></v-text-field>
        <template v-if="selection && clotheSizes.length > 0">
    <span v-if="amount > getMaxStock(selection)" class="error-message">
      La cantidad ingresada es mayor que el stock disponible.
    </span>
          <span v-if="amount <= getMaxStock(selection)" class="info-message">
      Stock disponible: {{ getMaxStock(selection) }}
    </span>
        </template>
      </div>

      <v-btn
        class="text-none flex-grow-1"
        prepend-icon="mdi-cart-outline"
        :color="colors.primary_dark"
        variant="flat"
        @click="addToCart"
        :disabled="!selection || (amount > getMaxStock(selection))"
      >
        Agregar al carrito
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import {ref, onMounted, watch, reactive} from "vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";
import { useCartStore } from "@/store/CartStore";
import Swal from "sweetalert2";
import { decryptValue } from "@/utils/Crypto";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useClotheStore();
const cartStore = useCartStore();
const hoverImage = ref(null);
const rating = ref(4);
const selection = ref(null);
const clothe = ref([]);
const colors = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  red: Colors.cs_red,
  gray: Colors.cs_opacity_gray,
};

const mainImage = ref(null);
const imagesArray = ref([]);
const defaultImage = "https://via.placeholder.com/500";
const amount = ref(1);
onMounted(async () => {
  await getOneClothe();
  watch(
    () => router.currentRoute.value,
    async (to, from) => {
      if (to.name === "Product"){
        if (to.params.id !== from.params.id) {
          await getOneClothe();
        }
      }
    }
  );
});

const getOneClothe = async () => {
  const id = getIdFromParams();
  await store.findClotheById(id);
  clothe.value = store.getClothe;

  if (clothe.value.images.length < 5) {
    imagesArray.value = Array.from(
      { length: 5 },
      (_, i) => clothe.value.images[i % clothe.value.images.length]
    );
  } else {
    imagesArray.value = clothe.value.images.slice(0, 5);
  }

  mainImage.value = imagesArray.value[0].url;
};
const addToCart = async () => {
  if (!selection.value) {
    return;
  }
  try {
    const sizeId = getSizeIdFromName(clothe.value, selection.value);
    const response = await cartStore.addToCart(clothe.value.id, amount.value, sizeId);
    console.log(response)
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "¡Producto agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const clotheName = ref(null);
const clotheDescription = ref(null);
const clothePrice = ref(null);
const clotheSizes = ref([]);

watch(clothe, (newValue) => {
  clotheName.value = newValue.name;
  clotheDescription.value = newValue.description;
  clotheSizes.value = newValue.stock;
});

watch(selection, (newSize) => {
  const selectedSize = clotheSizes.value.find(
    (size) => size.size.name === newSize
  );
  if (selectedSize) {
    clothePrice.value = selectedSize.price;
  }
});

const getIdFromParams = () => {
  const id = router.currentRoute.value.params.id;
  return decryptValue(id);
};

const getChipVariant = (size) => {
  return selection.value === size.size.name ? "flat" : "outlined";
};

const updateMainImage = (index) => {
  mainImage.value = imagesArray.value[index].url || defaultImage;
};

const selectSize = (selectedSize) => {
  selection.value = selectedSize;
};

const getSizeIdFromName = (clothe, sizeName) => {
  const stock = clothe.stock;
  for (const size of stock) {
    if (size.size.name === sizeName) {
      return size.size.id;
    }
  }
  return null;
};
const getMaxStock = (sizeName) => {
  const selectedSize = clotheSizes.value.find((size) => size.size.name === sizeName);
  return selectedSize ? selectedSize.quantity : 0;
};
</script>
