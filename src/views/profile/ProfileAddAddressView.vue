<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Mis direcciones</p>
      <v-form>
        <v-row class="mt-5">
          <v-col cols="12" md="4">

          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
              <v-text-field density="compact" placeholder="Calle" prepend-inner-icon="mdi-google-maps"
                variant="outlined" :error-messages="v$.form.street.$errors.map(e => e.$message)" required
                @input="v$.form.street.$touch()" @blur="v$.form.street.$touch()" />
            </div>

          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field density="compact" placeholder="Calle" v-model="form.suburb"
                prepend-inner-icon="mdi-google-maps" variant="outlined"
                :error-messages="v$.form.suburb.$errors.map(e => e.$message)" required
                @input="v$.form.suburb.$touch()" />
            </div>

          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Numero exterior</div>
              <v-text-field density="compact" placeholder="Numero exterior" v-model="form.extnumber"
                prepend-inner-icon="mdi-google-maps" variant="outlined"
                :error-messages="v$.form.extnumber.$errors.map(e => e.$message)" @input="v$.form.extnumber.$touch()"
                @blur="v$.form.extnumber.$touch()" />
            </div>

          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Numero interior</div>
              <v-text-field density="compact" placeholder="Numero exterior" v-model="form.intnumber"
                prepend-inner-icon="mdi-google-maps" variant="outlined"
                :error-messages="v$.form.intnumber.$errors.map(e => e.$message)" @input="v$.form.intnumber.$touch()"
                @blur="v$.form.intnumber.$touch()" />
            </div>

          </v-col>

          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Codigo Postal
              </div>
              <v-text-field density="compact" placeholder="Codigo Postal" prepend-inner-icon="mdi-pound"
                variant="outlined" v-model="form.cp" type="number"
                :error-messages="v$.form.cp.$errors.map(e => e.$message)" required @input="v$.form.cp.$touch()"
                @blur="v$.form.cp.$touch()" />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Estado</div>

              <v-select clearable placeholder="Estado" :items="states" dense variant="outlined" v-model="form.state"
                prepend-inner-icon="mdi-google-maps" :error-messages="v$.form.state.$errors.map(e => e.$message)"
                required @input="v$.form.state.$touch()" @blur="v$.form.state.$touch()"></v-select>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Ciudad</div>

              <v-select clearable placeholder="Estado" :items="towns" dense variant="outlined" v-model="form.town"
                prepend-inner-icon="mdi-google-maps" :error-messages="v$.form.town.$errors.map(e => e.$message)"
                required @input="v$.form.town.$touch()" @blur="v$.form.town.$touch()"></v-select>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn variant="outlined" class=" text-none" :color="colors.primary_dark" block prepend-icon="mdi-plus"
              @click="clear">Cancelar</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn variant="outlined" class="mb-8 text-none" :color="colors.primary_dark" block prepend-icon="mdi-plus"
              @click="v$.$validate">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import { ref, } from 'vue';
import { reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

const user = "Crristofer Soto ventura"
const form = ref({
  user: user,
  street: '',
  town: null,
  suburb: '',
  extnumber: '',
  intnumber: '',
  cp: '',
  state: null
})
const state = reactive({
  ...form
})
const states = [

  "Morelos",

];

const towns = [

  "Cuernavaca",


]

const rules = {
  form: {
    street: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100)
    },
    suburb: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100)
    },
    extnumber: {

      minLength: minLength(1),
      maxLength: maxLength(10)
    },
    intnumber: {

      minLength: minLength(1),
      maxLength: maxLength(10)
    },
    cp: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(5)
    },
    state: {
      required
    },
    town: {
      required
    }
  }
};
const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(form.value)) {
    state[key] = value
  }
}

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Perfil",
    disabled: false,
    href: "/profileAccount",
  },
  {
    title: "Mis direcciones",
    disabled: false,
    href: "/profileAddress",
  },
  {
    title: "Agregar nueva direccion",
    disabled: true,
    href: "/profileAddAddress",
  },
];
</script>
