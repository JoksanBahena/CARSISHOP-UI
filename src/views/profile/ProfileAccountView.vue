<template>
  <breadcrumbs-component :items="items" />
  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mi cuenta</p>
    <v-card variant="flat">
      <v-card-item>
        <v-form>
          <div class="d-flex align-center mb-2">
            <v-card-title>
              <v-icon size="20"> mdi-account-outline </v-icon>
              Mi información personal
            </v-card-title>
          </div>
          <v-divider class="mb-5" />

          <v-row>
            <v-col cols="12" lg="4" md="4" class="text-center">
              <v-avatar size="200" :color="colors.primary_dark">
                <v-img
                  v-if="state.img"
                  :lazy-src="state.img"
                  :src="state.img"
                  alt="profile picture"
                />
                <v-icon v-else size="80"> mdi-account </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="12" lg="8" md="8">
              <v-row>
                <v-col cols="12">
                  <div class="text-subtitle-1 font-weight-medium">
                    Foto de perfil
                  </div>
                  <v-file-input
                    density="compact"
                    type="file"
                    accept="image/png, image/jpeg, image/bmp"
                    variant="outlined"
                    prepend-icon="mdi-camera-outline"
                    chips
                    show-size
                    @change="onProfilepicChange"
                    :readonly="is_disabled"
                    v-model="state.new_img"
                    @blur="v$.new_img.$touch"
                    @input="v$.new_img.$touch"
                    :error-messages="v$.new_img.$errors.map((e) => e.$message)"
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
                <v-col cols="12" lg="6" md="6">
                  <div>
                    <div class="text-subtitle-1 font-weight-medium">
                      Nombre(s)
                    </div>
                    <v-text-field
                      density="compact"
                      placeholder="Nombre(s)"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      :readonly="is_disabled"
                      v-model="state.name"
                      @input="v$.name.$touch"
                      @blur="v$.name.$touch"
                      :error-messages="v$.name.$errors.map((e) => e.$message)"
                    />
                  </div>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <div class="text-subtitle-1 font-weight-medium">
                    Apellidos
                  </div>
                  <v-text-field
                    density="compact"
                    placeholder="Apellidos"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :readonly="is_disabled"
                    v-model="state.surname"
                    @input="v$.surname.$touch"
                    @blur="v$.surname.$touch"
                    :error-messages="v$.surname.$errors.map((e) => e.$message)"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Correo</div>
              <v-text-field
                density="compact"
                placeholder="Correo electrónico"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                readonly
                :disabled="!is_disabled"
                v-model="state.email"
                @input="v$.email.$touch"
                @blur="v$.email.$touch"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
              />
            </v-col>

            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Teléfono</div>
              <v-text-field
                density="compact"
                placeholder="Teléfono"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                type="number"
                hide-spin-buttons
                :readonly="is_disabled"
                v-model="state.phone"
                @input="v$.phone.$touch"
                @blur="v$.phone.$touch"
                :error-messages="v$.phone.$errors.map((e) => e.$message)"
                :counter="10"
              />
            </v-col>

            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Género</div>
              <v-select
                v-model="state.genere"
                density="compact"
                placeholder="Género"
                prepend-inner-icon="mdi-account-outline"
                :readonly="is_disabled"
                :items="genders"
                item-title="gender"
                item-value="id_gender"
                variant="outlined"
                @input="v$.genere.$touch"
                @blur="v$.genere.$touch"
                :error-messages="v$.genere.$errors.map((e) => e.$message)"
              />
            </v-col>
          </v-row>

          <div v-if="is_seller">
            <div class="d-flex align-center mb-2 mt-12">
              <v-card-title>
                <v-icon size="20"> mdi-account-outline </v-icon>
                Mi información de vendedor
              </v-card-title>
            </div>
            <v-divider class="mb-5" />
            <v-row>
              <v-col cols="6">
                <div class="text-subtitle-1 font-weight-medium">CURP</div>
                <v-text-field
                  density="compact"
                  placeholder="CURP"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  :readonly="is_disabled"
                  :counter="18"
                  v-model="state.curp"
                  @keyup="uppercase"
                  @input="v$.curp.$touch"
                  @blur="v$.curp.$touch"
                  :error-messages="v$.curp.$errors.map((e) => e.$message)"
                />
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1 font-weight-medium">RFC</div>
                <v-text-field
                  density="compact"
                  placeholder="RFC"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  :readonly="is_disabled"
                  :counter="13"
                  v-model="state.rfc"
                  @keyup="uppercase"
                  @input="v$.rfc.$touch"
                  @blur="v$.rfc.$touch"
                  :error-messages="v$.rfc.$errors.map((e) => e.$message)"
                />
              </v-col>
              <v-col cols="12">
                <v-card variant="outlined" :color="'grey-lighten-1'">
                  <v-expansion-panels v-model="panel" flat>
                    <v-expansion-panel>
                      <v-expansion-panel-title
                        class="text-subtitle-1 font-weight-medium"
                      >
                        Identificación subida
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-img
                          width="200"
                          max-width="200"
                          :src="state.image_view"
                          class="mx-auto"
                        />
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <v-divider class="mb-5" />

          <v-row class="mt-8">
            <v-col v-if="!is_disabled" cols="6">
              <v-btn
                variant="flat"
                prepend-icon="mdi-close-circle-outline"
                class="text-none"
                :color="colors.primary"
                block
                @click="clear()"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col :cols="is_disabled ? '12' : '6'">
              <v-btn
                variant="flat"
                append-icon="mdi-check-circle-outline"
                class="text-none"
                :color="colors.primary_dark"
                block
                @click="is_disabled ? onEdit() : submitForm()"
                :disabled="v$.$errors.length > 0"
                :loading="!is_disabled && loading"
              >
                {{ is_disabled ? "Editar" : "Guardar" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref, reactive, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { useProfileStore } from "@/store/ProfileStore";
import { Toast } from "@/utils/Alerts.js";
import { getErrorMessage } from "@/utils/Errors";
import { encryptAES } from "@/utils/Crypto";

const { withMessage, regex } = helpers;
const { profile, updateProfile, updateProfileImage, updateSellerProfile } =
  useProfileStore();
const error = ref({ error: "", message: "" });

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_opacity_gray,
};

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
    title: "Mi cuenta",
  },
];

const genders = [
  { gender: "Femenino", id_gender: "1" },
  { gender: "Masculino", id_gender: "2" },
  { gender: "Otro", id_gender: "3" },
];

const user = {
  name: "",
  surname: "",
  phone: "",
  genere: {},
  email: "",
  img: null,
  new_img: [],

  curp: "",
  rfc: "",
  image_view: "",
  image: [],
};

const is_seller = ref(false);
const panel = ref([]);

const state = reactive({ ...user });

const getUserInfo = async () => {
  state.name = profile.name;
  state.surname = profile.surname;
  state.email = profile.username;
  state.phone = profile.phone;
  state.genere = profile.gender ? profile.gender : "ADMIN";
  state.img = profile.profilepic ? profile.profilepic : null;

  if (profile.seller?.request_status === "APPROVED") {
    state.curp = profile.seller.curp;
    state.rfc = profile.seller.rfc;
    state.image_view = profile.seller.image;
  }
};

const uppercase = () => {
  state.rfc = state.rfc.toUpperCase();
  state.curp = state.curp.toUpperCase();
};

onMounted(() => {
  if (profile.seller?.request_status === "APPROVED") {
    is_seller.value = true;
  }
  getUserInfo();
});

const max_size = 2;
const imgSizeValidate = () => {
  return (value) => {
    return value.every((image) => image.size / 1024 / 1024 <= max_size);
  };
};

const rules = {
  name: {
    required: withMessage("El nombre es requerido", required),
    minLength: withMessage(
      "El nombre debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El nombre debe tener menos de 10 caracteres",
      maxLength(50)
    ),
    regex: withMessage(
      "El nombre solo puede contener letras, acentos, espacios y dierecis",
      regex(/^[a-zA-ZÀ-ÿ\s]+$/)
    ),
  },
  surname: {
    required: withMessage("El apellido es requerido", required),
    minLength: withMessage(
      "El apellido debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El apellido debe tener menos de 10 caracteres",
      maxLength(50)
    ),
    regex: withMessage(
      "El apellido solo puede contener letras, acentos, espacios y dierecis",
      regex(/^[a-zA-ZÀ-ÿ\s]+$/)
    ),
  },
  genere: {
    required: withMessage("El genero es requerido", required),
  },
  phone: {
    required: withMessage("El teléfono es requerido", required),
    integer: withMessage("El teléfono debe ser un número", integer),
    regex: withMessage(
      "El teléfono solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El teléfono debe tener al menos 10 caracteres",
      minLength(10)
    ),
    maxLength: withMessage(
      "El teléfono debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  email: {
    required: withMessage("El correo es requerido", required),
    email: withMessage("El correo no es válido", regex(/^.+@.+\..+$/)),
  },
  new_img: {
    imgSizeValidate: withMessage(
      `El tamaño de la imagen no debe exceder ${max_size}MB`,
      imgSizeValidate()
    ),
  },
  curp: {
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
    imgSizeValidate: withMessage(
      `El tamaño de la imagen no debe exceder ${max_size}MB`,
      imgSizeValidate()
    ),
  },
};

const v$ = useVuelidate(rules, state);

const is_disabled = ref(true);
const loading = ref(false);

const onEdit = () => {
  is_disabled.value = false;
};

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  error.value = { error: "", message: "" };
  loading.value = true;

  try {
    let response;

    if (typeof state.genere === "object") {
      state.gender_id = state.genere.id;
    } else {
      state.gender_id = state.genere;
    }

    response = await updateProfile({
      name: encryptAES(state.name),
      surname: encryptAES(state.surname),
      phone: encryptAES(state.phone),
      gender: state.gender_id,
    });

    if (state.new_img.length > 0) {
      response = await updateProfileImage({
        profilepic: state.new_img[0],
        username: state.email,
      });
    }

    if (state.curp || state.rfc || state.image.length > 0) {
      const seller = {
        id: profile.seller.id,
        user: profile.id,
        request_status: profile.seller.request_status,
        curp: encryptAES(state.curp),
        rfc: encryptAES(state.rfc),
        image: state?.image[0] || null,
      };

      if (seller.image === null) delete seller.image;

      response = await updateSellerProfile(seller);
    }

    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Perfil actualizado",
      });
    }
  } catch (err) {
    console.log(err);
    error.value = getErrorMessage(err);
  } finally {
    is_disabled.value = true;
    loading.value = false;
  }
};

const clear = () => {
  panel.value = undefined;
  is_disabled.value = true;
  v$.value.$reset();

  for (const [key, value] of Object.entries(user)) {
    state[key] = value;
  }

  getUserInfo();
};

const onProfilepicChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    state.img = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
