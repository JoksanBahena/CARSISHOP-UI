<template>
  <div class="mt-5">
    <h2 class="mb-5"> {{ title }} </h2>
    <v-row>
      <v-col v-for="item in props.data" :key="item.id">
        <v-card class="mx-auto" max-width="344">
          <v-img
            height="350px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            cover
          ></v-img>

          <v-card-title> {{ item.name }} </v-card-title>

          <v-card-subtitle> {{ item.description }} </v-card-subtitle>

          <v-card-actions>
            <v-card-text color="orange-lighten-2" variant="text">
              ${{ item.price }} MXN
            </v-card-text>

            <v-spacer></v-spacer>

            <v-btn color="orange" text>Ver más</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
  title: String,
});
</script>
<style lang=""></style>
