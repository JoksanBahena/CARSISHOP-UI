<template>
  <div class="mt-5">
    <h2 class="mb-5"> {{ title }} </h2>
    <v-sheet class="mx-auto">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="item in props.data" :key="item.id">
          <v-card class="mx-auto me-5" max-width="300">
            <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover/>

            <v-card-title> {{ item.name }} </v-card-title>

            <v-card-subtitle class="subtitle"> {{ item.description }} </v-card-subtitle>

            <v-card-actions>
              <v-card-text color="orange-lighten-2" variant="text">
                ${{ item.price }} MXN
              </v-card-text>

              <v-spacer></v-spacer>

              <v-btn color="orange" text>Ver más</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
  title: String,
});
</script>
<style scoped>
.subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
