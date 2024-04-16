<template>
  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Agregar nueva dirección</p>

    <v-card variant="flat" class="mt-4">
      <v-card-title>Dirección de envío</v-card-title>
      <v-card-item>
        <v-form>
          <v-row>
            <v-col>
              <div class="text-subtitle-1 font-weight-medium">
                Nombre de la dirección (Referencia)
              </div>
              <v-text-field density="compact" placeholder="Nombre de la dirección"
                prepend-inner-icon="mdi-map-marker-outline" variant="outlined" type="text" hide-spin-buttons
                :counter="33" v-model="state.name" @blur="v$.name.$touch" @input="v$.name.$touch"
                :error-messages="v$.name.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">
                Codigo Postal
              </div>
              <v-text-field density="compact" placeholder="Codigo Postal" prepend-inner-icon="mdi-pound"
                variant="outlined" type="number" hide-spin-buttons :counter="5" v-model="state.cp" @blur="v$.cp.$touch"
                @input="v$.cp.$touch" :error-messages="v$.cp.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="6" md="4">
              <div class="text-subtitle-1 font-weight-medium">Estado</div>
              <v-select clearable placeholder="Estado" :items="statesData" density="compact" variant="outlined"
                prepend-inner-icon="mdi-map-marker-outline" v-model="state.state" @blur="v$.state.$touch"
                @input="v$.state.$touch" :error-messages="v$.state.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="6" md="4">
              <div class="text-subtitle-1 font-weight-medium">Ciudad</div>
              <v-select clearable placeholder="Estado" :items="getFilteredTowns()" density="compact" variant="outlined"
                no-data-text="Selecciona un estado" prepend-inner-icon="mdi-map-marker-outline" v-model="state.town"
                @blur="v$.town.$touch" @input="v$.town.$touch"
                :error-messages="v$.town.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field density="compact" placeholder="Calle" prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined" v-model="state.suburb" @blur="v$.suburb.$touch" @input="v$.suburb.$touch"
                :error-messages="v$.suburb.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
              <v-text-field density="compact" placeholder="Calle" prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined" v-model="state.street" @blur="v$.street.$touch" @input="v$.street.$touch"
                :error-messages="v$.street.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="6" md="2">
              <div class="text-subtitle-1 font-weight-medium">
                Número exterior
              </div>
              <v-text-field density="compact" placeholder="Núm. ext." prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined" type="number" hide-spin-buttons v-model="state.extnumber" @blur="v$.extnumber.$touch"
                @input="v$.extnumber.$touch" :error-messages="v$.extnumber.$errors.map((e) => e.$message)" />
            </v-col>
            <v-col cols="6" md="2">
              <div class="text-subtitle-1 font-weight-medium">
                Número interior
              </div>
              <v-text-field density="compact" placeholder="Núm. int." prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined" type="number" hide-spin-buttons v-model="state.intnumber" @blur="v$.intnumber.$touch"
                @input="v$.intnumber.$touch" :error-messages="v$.intnumber.$errors.map((e) => e.$message)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn variant="flat" class="text-none" :color="colors.primary" block
                prepend-icon="mdi-close-circle-outline" @click="clear()">Cancelar</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn variant="flat" class="mb-8 text-none" :color="colors.primary_dark" block
                append-icon="mdi-check-circle-outline" @click="submitForm()" :loading="loading">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { reactive, onMounted, watch, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { useStateAndTownStore } from "@/store/StateAndTownStore";
import { useProfileStore } from "@/store/ProfileStore";
import { encryptAES } from "@/utils/Crypto";
import { Toast } from "@/utils/Alerts";

const { fetchStates } = useStateAndTownStore();
const { registerAddress } = useProfileStore();

const { withMessage, regex } = helpers;

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const address = {
  name: "",
  street: "",
  suburb: "",
  extnumber: "",
  intnumber: "",
  cp: "",
  state: null,
  town: null,
};

const state = reactive({ ...address });
const statesData = reactive([]);
const townsData = reactive([]);
const loading = ref(false);

const fetchStatesData = async () => {
  try {
    const response = await fetchStates();
    response.forEach((stateData) => {
      statesData.push(stateData.name);
    });
    response.forEach((stateData) => {
      townsData.push(stateData.towns.map((town) => town.name));
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchStatesData();
});

const getFilteredTowns = () => {
  if (state.state) {
    const stateIndex = statesData.findIndex(
      (stateData) => stateData === state.state
    );
    return townsData[stateIndex] || [];
  } else {
    return [];
  }
};

watch(
  () => state.state,
  () => {
    state.town = null;
  }
);

const rules = {
  street: {
    required: withMessage("La calle es requerida", required),
    maxLength: withMessage(
      "La calle debe tener menos de 50 carácteres",
      maxLength(50)
    ),
  },
  suburb: {
    required: withMessage("La colonia es requerida", required),
    maxLength: withMessage(
      "La colonia debe tener menos de 50 carácteres",
      maxLength(50)
    ),
  },
  cp: {
    required: withMessage("El codigo postal es requerido", required),
    integer: withMessage("El codigo postal debe ser un número", integer),
    regex: withMessage(
      "El codigo postal solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El codigo postal debe tener 5 digitos",
      minLength(5)
    ),
    maxLength: withMessage(
      "El codigo postal debe tener 5 digitos",
      maxLength(5)
    ),
  },
  state: {
    required: withMessage("El estado es requerido", required),
  },
  town: {
    required: withMessage("La ciudad es requerida", required),
  },
  extnumber: {
    required: withMessage("El número exterior es requerido", required),
    integer: withMessage("El número exterior debe ser un número", integer),
    regex: withMessage(
      "El número exterior solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El numero exterior debe tener al menos 1 caracter",
      minLength(1)
    ),
    maxLength: withMessage(
      "El numero exterior debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  intnumber: {
    integer: withMessage("El número interior debe ser un número", integer),
    regex: withMessage(
      "El número interior solo debe contener números",
      regex(/^\d+$/)
    ),
  },
  name: {
    required: withMessage("El nombre de la dirección es requerido", required),
    maxLength: withMessage(
      "El nombre de la dirección debe tener menos de 33 carácteres",
      maxLength(33)
    ),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  if (state.intnumber == "") {
    state.intnumber = "S/N";
  }
  if (state.extnumber == "") {
    state.extnumber = "S/N";
  }

  const params = {
    name: encryptAES(state.name),
    state: state.state,
    town: state.town,
    cp: encryptAES(state.cp),
    suburb: encryptAES(state.suburb),
    street: encryptAES(state.street),
    intnumber: encryptAES(state.intnumber),
    extnumber: encryptAES(state.extnumber),
  };

  loading.value = true;

  try {
    const response = await registerAddress(params);
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Dirección registrada correctamente",
      });
      window.histoy.back()
      clear();
      loading.value = false;
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Error al registrar la dirección",
    });
    loading.value = false;
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const clear = () => {
  v$.value.$reset();

  for (const [key, value] of Object.entries(address)) {
    state[key] = value;
  }

  state.name = "";
  state.street = "";
  state.suburb = "";
  state.extnumber = "";
  state.intnumber = "";
  state.cp = "";
  state.state = null;
  state.town = null;
};
</script>
