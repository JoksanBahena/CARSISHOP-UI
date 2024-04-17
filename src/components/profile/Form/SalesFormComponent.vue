<template>
  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Ventas</p>

    <v-card variant="flat" class="mt-4">
      <v-card-title>Solicitud de vendedor</v-card-title>

      <v-card-item>
        <v-alert
          v-if="error.message"
          class="mb-8"
          variant="tonal"
          icon="mdi-alert-circle-outline"
          type="error"
          :text="error.message"
        />
      </v-card-item>

      <v-card-item>
        <v-form>
          <v-row>
            <v-col cols="12" lg="4" md="4">
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">CURP</div>
                <v-text-field
                  density="compact"
                  placeholder="CURP"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  :counter="18"
                  :readonly="disabled"
                  @keyup="uppercase"
                  v-model="state.curp"
                  @blur="v$.curp.$touch"
                  @input="v$.curp.$touch"
                  :error-messages="v$.curp.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">RFC</div>
                <v-text-field
                  density="compact"
                  placeholder="RFC"
                  prepend-inner-icon="mdi-calendar-month-outline"
                  variant="outlined"
                  @keyup="uppercase"
                  :counter="13"
                  :readonly="disabled"
                  v-model="state.rfc"
                  @blur="v$.rfc.$touch"
                  @input="v$.rfc.$touch"
                  :error-messages="v$.rfc.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col cols="12" lg="4" md="4">
              <div class="text-subtitle-1 font-weight-medium">
                Identificación
              </div>

              <v-file-input
                density="compact"
                type="file"
                accept="image/png, image/jpeg, image/bmp"
                variant="outlined"
                prepend-icon="mdi-camera-outline"
                chips
                show-size
                :readonly="disabled"
                @change="onFileChange"
                v-model="state.image"
                @blur="v$.image.$touch"
                @input="v$.image.$touch"
                :error-messages="
                  disabled ? [] : v$.image.$errors.map((e) => e.$message)
                "
              >
                <template v-slot:selection="{ fileNames }">
                  <template
                    v-for="(fileName, index) in fileNames"
                    :key="fileName"
                  >
                    <v-chip
                      class="me-2"
                      :color="colors.primary_dark"
                      size="small"
                      label
                    >
                      {{ fileName }}
                    </v-chip>
                  </template>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
          <div
            v-if="state.image.length > 0 || disabled"
            class="d-flex flex-column justify-center align-center mb-6"
            :style="{ border: '2px dashed' + colors.gray }"
          >
            <div class="text-subtitle-1 font-weight-medium ma-3 mr-auto">
              Imagen cargada:
            </div>
            <v-img width="300" max-width="300" :src="img_view" class="pb-12" />
          </div>
          <v-btn
            class="mb-8 text-none"
            variant="flat"
            :color="colors.primary_dark"
            prepend-icon="mdi-send"
            block
            @click="submitForm"
            :disabled="v$.$errors.length > 0 || disabled"
            :loading="loading"
          >
            Enviar solicitud
          </v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { onMounted, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useSellerStore } from "@/store/SellerStore.js";
import { useProfileStore } from "@/store/ProfileStore.js";
import { encryptAES } from "@/utils/Crypto";
import router from "@/router";
import { Toast } from "@/utils/Alerts.js";

const { requestSeller } = useSellerStore();
const { profile, getId } = useProfileStore();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  secondary: Colors.cs_secondary,
  white: Colors.cs_white,
  gray: Colors.cs_opacity_gray,
};

const { withMessage, regex } = helpers;

const seller = {
  curp: "",
  rfc: "",
  image: [],
};

const state = reactive({ ...seller });

const error = ref({ error: "", message: "" });
const loading = ref(false);
const img_view = ref(null);
const max_size = 2;
const disabled = ref(false);

const imgSizeValidate = () => {
  return (value) => {
    return value.every((image) => image.size / 1024 / 1024 <= max_size);
  };
};

const rules = {
  curp: {
    required: withMessage("El CURP es requerido", required),
    minLength: withMessage("El CURP debe tener 18 caracteres", minLength(18)),
    maxLength: withMessage("El CURP debe tener 18 caracteres", maxLength(18)),
    regex: withMessage(
      "El CURP no es válido",
      regex(
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      )
    ),
  },
  rfc: {
    required: withMessage("El RFC es requerido", required),
    minLength: withMessage("El RFC debe tener 13 caracteres", minLength(13)),
    maxLength: withMessage("El RFC debe tener 13 caracteres", maxLength(13)),
    regex: withMessage(
      "El RFC no es válido",
      regex(
        /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/
      )
    ),
  },
  image: {
    required: withMessage("La identificación es requerida", required),
    imgSizeValidate: withMessage(
      `El tamaño de la imagen no debe exceder ${max_size}MB`,
      imgSizeValidate()
    ),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  error.value = { error: "", message: "" };
  loading.value = true;

  try {
    const seller = {
      rfc: encryptAES(state.rfc),
      curp: encryptAES(state.curp),
      image: state.image[0],
      user: getId,
    };
    const response = await requestSeller(seller);
    if (response.status === 201) {
      Toast.fire({
        icon: "success",
        title: "Solicitud enviada correctamente",
      });
    }
  } catch (err) {
    error.value = { error: true, message: err };
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } finally {
    loading.value = false;
  }
};

const uppercase = () => {
  state.rfc = state.rfc.toUpperCase();
  state.curp = state.curp.toUpperCase();
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    img_view.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

onMounted(() => {
  if (
    profile.seller?.request_status === "PENDING" ||
    profile.seller?.request_status === "REJECTED"
  ) {
    state.curp = profile.seller.curp;
    state.rfc = profile.seller.rfc;
    img_view.value = profile.seller.image;
    disabled.value = true;
  }
});
</script>
