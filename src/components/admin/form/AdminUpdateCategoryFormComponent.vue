<template>
  <v-dialog max-width="600" persistent>
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 ps-2">Editar categoría</div>

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-title>

        <v-divider />
        <v-container>
          <v-form class="ma-2">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Nombre de la categoría
              </div>
              <v-text-field
                v-model="state.category"
                density="compact"
                placeholder="Nombre"
                prepend-inner-icon="mdi-tag-outline"
                variant="outlined"
                @blur="v$.category.$touch"
                @input="v$.category.$touch"
                :error-messages="v$.category.$errors.map((e) => e.$message)"
              />
            </div>
            <v-btn
              variant="flat"
              class="text-none"
              :color="colors.primary_dark"
              append-icon="mdi-check-circle-outline"
              @click="submitForm()"
              block
              :loading="loading"
            >
              Guardar
              <template v-slot:loader>
                <v-progress-linear indeterminate></v-progress-linear>
              </template>
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { reactive, watch, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useCategoryStore } from "@/store/CategoryStore";
import { Toast } from "@/utils/Alerts";

const { updateCategory } = useCategoryStore();
const { withMessage } = helpers;

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const props = defineProps({
  dialog: {
    type: Object,
    default: null,
  },
  selectedCategory: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  category: "",
});

const rules = {
  category: {
    required: withMessage("El nombre de la categoría es obligatorio", required),
    minLength: withMessage(
      "El nombre de la categoría debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El nombre de la categoría no debe tener más de 20 caracteres",
      maxLength(20)
    ),
  },
};

const v$ = useVuelidate(rules, state);
const loading = ref(false);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;
  loading.value = true;

  try {
    const response = await updateCategory(
      props.selectedCategory.id,
      state.category
    );
    if (response.status === 201 || response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Categoria actualizada correctamente",
      });
      clear();
      location.reload();
    } else {
      Toast.fire({
        icon: "error",
        title: response.response.data.message,
      });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      Toast.fire({
        icon: "error",
        title: errorMessage,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al actualizar la categoría",
      });
    }
  } finally {
    clear();
    loading.value = false;
  }
};

const clear = () => {
  state.category = "";
  v$.value.$reset();
};

watch(
  () => props.selectedCategory,
  (newValue) => {
    if (newValue) {
      state.category = newValue.name;
    }
  }
);
</script>
