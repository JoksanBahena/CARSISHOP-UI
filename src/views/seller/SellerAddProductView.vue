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
              @blur="v$.description.$touch"
              @input="v$.description.$touch"
              :error-messages="v$.description.$errors.map((e) => e.$message)"
            />
          </div>
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Precio del producto
            </div>
            <v-text-field
              v-model="state.price"
              density="compact"
              placeholder="$0.00"
              prepend-inner-icon="mdi-currency-usd"
              variant="outlined"
              type="number"
              hide-spin-buttons
              @blur="v$.price.$touch"
              @input="v$.price.$touch"
              :error-messages="v$.price.$errors.map((e) => e.$message)"
            />
          </div>
          <v-row>
            <v-col cols="6" lg md>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">Stock XS</div>
                <v-text-field
                  v-model="state.stock.xs"
                  density="compact"
                  placeholder="0"
                  prepend-inner-icon="mdi-size-xs"
                  variant="outlined"
                  type="number"
                  @blur="v$.stock.xs.$touch"
                  @input="v$.stock.xs.$touch"
                  :error-messages="v$.stock.xs.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col cols="6" lg md>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">Stock S</div>
                <v-text-field
                  v-model="state.stock.s"
                  density="compact"
                  placeholder="0"
                  prepend-inner-icon="mdi-size-s"
                  variant="outlined"
                  type="number"
                  @blur="v$.stock.s.$touch"
                  @input="v$.stock.s.$touch"
                  :error-messages="v$.stock.s.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col cols="6" lg md>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">Stock M</div>
                <v-text-field
                  v-model="state.stock.m"
                  density="compact"
                  placeholder="0"
                  prepend-inner-icon="mdi-size-m"
                  variant="outlined"
                  type="number"
                  @blur="v$.stock.m.$touch"
                  @input="v$.stock.m.$touch"
                  :error-messages="v$.stock.m.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col cols="6" lg md>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">Stock L</div>
                <v-text-field
                  v-model="state.stock.l"
                  density="compact"
                  placeholder="0"
                  prepend-inner-icon="mdi-size-l"
                  variant="outlined"
                  type="number"
                  @blur="v$.stock.l.$touch"
                  @input="v$.stock.l.$touch"
                  :error-messages="v$.stock.l.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col cols="6" lg md>
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">Stock XL</div>
                <v-text-field
                  v-model="state.stock.xl"
                  density="compact"
                  placeholder="0"
                  prepend-inner-icon="mdi-size-xl"
                  variant="outlined"
                  type="number"
                  @blur="v$.stock.xl.$touch"
                  @input="v$.stock.xl.$touch"
                  :error-messages="v$.stock.xl.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
          </v-row>
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
          <div class="text-subtitle-1 font-weight-medium">Imagenes</div>
          <v-file-input
            density="compact"
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            variant="outlined"
            prepend-icon="mdi-camera-outline"
            show-size
            multiple
            chips
            clearable
            @change="onFileChange"
          />
          <div
            v-if="image_urls.length > 0"
            class="d-flex flex-column pb-6"
            :style="{ border: '2px dashed' + colors.gray }"
          >
            <div class="text-subtitle-1 font-weight-medium ma-3 mr-auto">
              Lista de imágenes:
            </div>
            <v-row>
              <v-col
                v-for="(url, index) in image_urls"
                :key="index"
                draggable
                @dragstart="handleDragStart($event, index)"
                @dragover="handleDragOver($event)"
                @drop="handleDrop($event, index)"
                cols="12"
                lg="5"
                md="5"
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
            v-if="image_urls.length > 0"
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
import { ref, reactive } from "vue";
import Colors from "@/utils/Colors.js";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { required, decimal, maxLength, helpers } from "@vuelidate/validators";

const { withMessage, regex } = helpers;

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
  price: "",
  stock: {
    xs: null,
    s: null,
    m: null,
    l: null,
    xl: null,
  },
  category: null,
  subcategory: null,
};

const image_urls = ref([]);

const state = reactive({ ...product });

const rules = {
  name: {
    required: withMessage("El nombre del producto es obligatorio", required),
    maxLength: withMessage(
      "El nombre del producto no debe tener más de 30 carácteres",
      maxLength(50)
    ),
  },
  description: {
    required: withMessage(
      "La descripción del producto es obligatoria",
      required
    ),
    maxLength: withMessage(
      "La descripción del producto no debe tener más de 500 carácteres",
      maxLength(500)
    ),
  },
  price: {
    required: withMessage("El precio del producto es obligatorio", required),
    decimal: withMessage(
      "El precio del producto debe ser un valor valido",
      decimal
    ),
    regex: withMessage(
      "El precio del producto debe ser un valor valido",
      regex(/^\d+(\.\d{1,2})?$/)
    ),
  },
  stock: {
    xs: {
      required: withMessage("El stock XS es obligatorio", required),
      regex: withMessage("El stock debe ser valido", regex(/^\d+$/)),
    },
    s: {
      required: withMessage("El stock S es obligatorio", required),
      regex: withMessage("El stock debe ser valido", regex(/^\d+$/)),
    },
    m: {
      required: withMessage("El stock M es obligatorio", required),
      regex: withMessage("El stock debe ser valido", regex(/^\d+$/)),
    },
    l: {
      required: withMessage("El stock L es obligatorio", required),
      regex: withMessage("El stock debe ser valido", regex(/^\d+$/)),
    },
    xl: {
      required: withMessage("El stock XL es obligatorio", required),
      regex: withMessage("El stock debe ser valido", regex(/^\d+$/)),
    },
  },
  category: {
    required: withMessage("La categoría es obligatoria", required),
  },
  subcategory: {
    required: withMessage("La subcategoría es obligatoria", required),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  if (image_urls.value.length < 2) {
    Swal.fire({
      title: "Error!",
      text: "Por favor, sube al menos 2 imágenes",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  alert(JSON.stringify(state));
};

const onFileChange = (e) => {
  const files = e.target.files;
  const allowedTypes = ["image/png", "image/jpeg", "image/bmp"];
  const maxSize = 10_000_000;
  const maxImages = 5;

  if (image_urls.value.length + files.length > maxImages) {
    Swal.fire({
      title: "Error!",
      text: "Solo se permiten hasta un máximo de 5 imágenes",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        title: "Error!",
        text: "Solo se permiten archivos de imagen en formato PNG, JPEG o BMP",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (file.size > maxSize) {
      Swal.fire({
        title: "Error!",
        text: "La imagen no debe pesar más de 10MB",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      image_urls.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = (event) => {
  const index = event.dataTransfer.getData("text/plain");
  image_urls.value.splice(index, 1);
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

  const movedImageUrl = image_urls.value[draggedIndex];
  image_urls.value.splice(draggedIndex, 1);
  image_urls.value.splice(dropIndex, 0, movedImageUrl);
};

const clear = () => {
  image_urls.value = [];
};
</script>
