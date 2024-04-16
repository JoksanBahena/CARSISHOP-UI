<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Añadir producto</p>

    <v-form>
      <v-row class="mt-8">
        <v-col cols="12" lg="7" md="7">
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Nombre del producto
            </div>
            <v-text-field
              v-model="state.name"
              density="compact"
              placeholder="Nombre"
              prepend-inner-icon="mdi-package-variant-closed"
              variant="outlined"
              counter="100"
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
              :error-messages="v$.name.$errors.map((e) => e.$message)"
            />
          </div>
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Descripción del producto
            </div>
            <v-textarea
              v-model="state.description"
              density="compact"
              placeholder="Descripción"
              prepend-inner-icon="mdi-package-variant-closed"
              variant="outlined"
              auto-grow
              counter="200"
              @blur="v$.description.$touch"
              @input="v$.description.$touch"
              :error-messages="v$.description.$errors.map((e) => e.$message)"
            />
          </div>

          <div class="mb-4">
            <v-card
              variant="outlined"
              :color="
                v$.stock.$errors.length > 0 ? colors.red : 'grey-lighten-1'
              "
            >
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <div class="d-flex flex-row align-center">
                      <div class="text-subtitle-1 font-weight-medium">
                        Tallas
                      </div>
                      <div class="ml-2">
                        ({{
                          selected_sizes.length > 0
                            ? selected_sizes.join(", ")
                            : "Define al menos una talla"
                        }})
                      </div>
                    </div>

                    <template v-slot:actions>
                      <v-icon
                        :color="v$.stock.$errors.length > 0 ? colors.red : ''"
                      >
                        {{
                          v$.stock.$errors.length > 0
                            ? "mdi-alert-circle-outline"
                            : "mdi-chevron-down"
                        }}
                      </v-icon>
                    </template>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-chip-group
                      v-model="selected_sizes"
                      variant="outlined"
                      selected-class="text-white bg-indigo-darken-4"
                      multiple
                    >
                      <v-chip
                        v-for="(size, index) in sizes"
                        :key="index"
                        :value="size"
                      >
                        {{ size }}
                      </v-chip>
                    </v-chip-group>

                    <template v-for="(size, index) in state.stock" :key="index">
                      <v-row>
                        <v-col cols="6" lg="4" md="4">
                          <div class="text-subtitle-1 font-weight-medium">
                            Stock {{ size.size }}
                          </div>
                          <v-text-field
                            v-model="size.quantity"
                            density="compact"
                            placeholder="0"
                            :prepend-inner-icon="
                              'mdi-size-' + size.size.toLowerCase()
                            "
                            variant="outlined"
                            type="number"
                            autofocus
                            @blur="v$.stock.$touch"
                            @input="v$.stock.$touch"
                            :error-messages="
                              v$.stock.$each.$response.$errors[
                                index
                              ].quantity.map((e) => e.$message)
                            "
                          />
                        </v-col>
                        <br />
                        <v-col cols="6" lg="8" md="8">
                          <div class="text-subtitle-1 font-weight-medium">
                            Precio
                          </div>
                          <v-text-field
                            v-model="size.price"
                            density="compact"
                            placeholder="$0.00"
                            prepend-inner-icon="mdi-currency-usd"
                            variant="outlined"
                            type="number"
                            hide-spin-buttons
                            @blur="v$.stock.$touch"
                            @input="v$.stock.$touch"
                            :error-messages="
                              v$.stock.$each.$response.$errors[index].price.map(
                                (e) => e.$message
                              )
                            "
                          />
                        </v-col>
                      </v-row>
                    </template>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </div>
          <v-row>
            <v-col>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">Categoría</div>
                <v-select
                  v-model="state.category"
                  placeholder="Selecciona una categoría"
                  :items="categories"
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-tag-outline"
                  @blur="v$.category.$touch"
                  @input="v$.category.$touch"
                  :error-messages="v$.category.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">
                  Subcategoría
                </div>
                <v-select
                  v-model="state.subcategory"
                  placeholder="Selecciona una subcategoría"
                  :items="subcategories"
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-tag-multiple-outline"
                  @blur="v$.subcategory.$touch"
                  @input="v$.subcategory.$touch"
                  :error-messages="
                    v$.subcategory.$errors.map((e) => e.$message)
                  "
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="5" md="5">
          <div class="text-subtitle-1 font-weight-medium">Imágenes</div>
          <v-file-input
            v-model="state.image_urls.value"
            density="compact"
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            variant="outlined"
            prepend-icon="mdi-camera-outline"
            clear-icon="mdi-close"
            show-size
            multiple
            chips
            @change="onFileChange"
            @blur="v$.image_urls.$touch"
            @input="v$.image_urls.$touch"
            :error-messages="v$.image_urls.$errors.map((e) => e.$message)"
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="(fileName, index) in fileNames" :key="fileName">
                <v-chip
                  v-if="index < max_images"
                  class="me-2"
                  color="deep-purple-accent-4"
                  size="small"
                  label
                >
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
          <div
            v-if="state.image_urls.length > 0"
            class="d-flex flex-column pb-6 mt-4"
            :style="{ border: '2px dashed' + colors.gray }"
          >
            <div class="text-subtitle-1 font-weight-medium ma-3 mr-auto">
              Lista de imágenes:
            </div>
            <v-row>
              <v-col
                v-for="(url, index) in state.image_urls"
                :key="index"
                draggable
                @dragstart="handleDragStart($event, index)"
                @dragover="handleDragOver($event)"
                @drop="handleDrop($event, index)"
                cols="12"
                lg="5"
                md="8"
              >
                <div class="d-flex align-center mx-12">
                  <p class="mr-1">{{ index + 1 }}.</p>
                  <v-avatar size="160" rounded="0">
                    <v-img :src="url" />
                  </v-avatar>
                </div>
              </v-col>
            </v-row>
          </div>
          <div
            v-if="state.image_urls.length > 0"
            class="d-flex align-center justify-center py-2 mt-6"
            :style="{ border: '2px dashed' + colors.gray }"
            @drop="removeImage($event)"
            @dragover.prevent
            @dragenter.prevent
          >
            <v-icon>mdi-trash-can-outline</v-icon>
            <span class="ml-2 text-button text-none"
              >Arrastra para eliminar</span
            >
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn
            variant="flat"
            class="text-none"
            :color="colors.primary"
            block
            prepend-icon="mdi-close-circle-outline"
            @click="clear()"
            >Cancelar</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            variant="flat"
            class="mb-8 text-none"
            :color="colors.primary_dark"
            block
            append-icon="mdi-check-circle-outline"
            @click="submitForm()"
            >Guardar</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import Colors from "@/utils/Colors.js";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  decimal,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

const { withMessage, forEach, regex } = helpers;

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
    to: { name: "SellerResumen" },
  },
  {
    title: "Mis productos",
    to: { name: "SellerProducts" },
  },
  {
    title: "Añadir producto",
  },
];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  gray: Colors.cs_opacity_gray,
  red: Colors.cs_red,
};

const categories = ["Hombre", "Mujer", "Niño", "Niña"];

const subcategories = [
  "Camiss",
  "Pantalón",
  "Zapatos",
  "Accesorio",
  "Ropa interior",
];

const product = {
  name: "",
  description: "",
  category: null,
  subcategory: null,
  stock: [],
  image_urls: [],
};

const max_size = 2;
const max_images = 5;

const state = reactive({ ...product });

const imgSizeValidate = () => {
  return (value) => {
    return value.value.every((image) => image.size / 1024 / 1024 <= max_size);
  };
};

const rules = {
  name: {
    required: withMessage("El nombre del producto es obligatorio", required),
    maxLength: withMessage(
      "El nombre del producto no debe tener más de 100 carácteres",
      maxLength(100)
    ),
  },
  description: {
    required: withMessage(
      "La descripción del producto es obligatoria",
      required
    ),
    maxLength: withMessage(
      "La descripción del producto no debe tener más de 200 carácteres",
      maxLength(200)
    ),
  },
  category: {
    required: withMessage("La categoría es obligatoria", required),
  },
  subcategory: {
    required: withMessage("La subcategoría es obligatoria", required),
  },
  stock: {
    required,
    minLength: minLength(1),
    $each: forEach({
      quantity: {
        required: withMessage("El stock es obligatorio", required),
        regex: withMessage("El stock debe ser valido", regex(/^\d+$/)),
      },
      price: {
        required: withMessage("El precio es obligatorio", required),
        decimal: withMessage("El precio debe valido", decimal),
        regex: withMessage(
          "El precio debe tener máximo 2 decimales",
          regex(/^\d+(\.\d{1,2})?$/)
        ),
      },
    }),
  },
  image_urls: {
    required: withMessage("Mínimo 2 imágenes del producto", required),
    imgSizeValidate: withMessage(
      `El tamaño de la imagen no debe exceder ${max_size}MB`,
      imgSizeValidate()
    ),
    minLength: withMessage("Mínimo 2 imágenes del producto", minLength(2)),
    maxLength: withMessage(
      `Máximo ${max_images} imágenes del producto`,
      maxLength(4)
    ),
  },
};

const v$ = useVuelidate(rules, state);

const sizes = ["XS", "S", "M", "L", "XL"];

const selected_sizes = ref([]);

const submitForm = () => {
  v$.value.$touch();

  if (v$.value.$error) return;

  alert(JSON.stringify(state));
};

const onFileChange = (e) => {
  const files = e.target.files;
  const remaining_space = max_images - state.image_urls.length;
  const files_add = Math.min(remaining_space, files.length);

  for (let i = 0; i < files_add; i++) {
    const file = files[i];
    if (file.size / 1024 / 1024 <= max_size) {
      const reader = new FileReader();

      reader.onload = (event) => {
        state.image_urls.push(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }
};

const removeImage = (event) => {
  const index = event.dataTransfer.getData("text/plain");
  state.image_urls.splice(index, 1);
};

const handleDragStart = (event, index) => {
  event.dataTransfer.setData("text/plain", index);
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event, dropIndex) => {
  event.preventDefault();

  const draggedIndex = event.dataTransfer.getData("text/plain");

  if (draggedIndex === "") {
    return;
  }

  const movedImageUrl = state.image_urls[draggedIndex];
  state.image_urls.splice(draggedIndex, 1);
  state.image_urls.splice(dropIndex, 0, movedImageUrl);
};

const clear = () => {
  v$.value.$reset();
  state.name = "";
  state.description = "";
  state.category = null;
  state.subcategory = null;
  state.stock = [];
  state.image_urls = [];
  selected_sizes.value = [];
};

watch(selected_sizes, (value, old_value) => {
  const deselected_sizes = old_value.filter((size) => !value.includes(size));
  state.stock = state.stock.filter(
    (item) => !deselected_sizes.includes(item.size)
  );

  const existingSizes = state.stock.map((item) => item.size);
  const newSizes = value.filter((size) => !existingSizes.includes(size));

  const newStock = newSizes.map((size) => ({
    size,
    quantity: 0,
    price: "",
  }));

  state.stock = [...state.stock, ...newStock];
});
</script>
