<template>
  <h4 class="text-h4 font-weight-medium">Reseñas</h4>
  <v-row class="my-6">
    <v-col cols="4">
      <h5 class="text-h5 font-weight-medium">Calificación</h5>

      <div class="my-6 d-flex">
        <p class="text-h2 font-weight-regular mr-4">4.9</p>

        <div class="d-flex flex-column">
          <v-rating
            :model-value="3.5"
            color="yellow-darken-3"
            density="comfortable"
            half-increments
            disabled
          />
          <div class="px-3">Basado en 3,360 reseñas</div>
        </div>
      </div>

      <div>
        <v-list
          bg-color="transparent"
          class="d-flex flex-column-reverse"
          density="compact"
        >
          <v-list-item v-for="(rating, i) in 5" :key="i">
            <v-progress-linear
              :model-value="rating * 15"
              class="mx-n5"
              color="yellow-darken-3"
              height="20"
              rounded
            />

            <template v-slot:prepend>
              <span>{{ rating }}</span>
              <v-icon class="mx-3" icon="mdi-star" />
            </template>

            <template v-slot:append>
              <div class="rating-values">
                <span class="d-flex justify-end"> {{ rating * 12 }} </span>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-col>
    <v-col>
      <h5 class="text-h5 font-weight-medium">Reseñas (14)</h5>
      <v-list class="my-4">
        <v-item-group class="mb-12" v-for="review in reviews" :key="review.id">
          <v-list-item>
            <div class="d-flex align-center">
              <v-avatar size="36px">
                <v-img v-if="review.avatar" alt="Avatar" :src="review.avatar" />
                <v-icon v-else :color="colors.primary_dark" size="42px">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <p class="mx-2 font-weight-bold">{{ review.user }}</p>
              <p
                class="mx-2 text-caption font-weight-regular"
                :style="{ color: colors.cs_gray }"
              >
                {{ review.date }}
              </p>

              <v-spacer></v-spacer>

              <v-rating
                :model-value="review.rating"
                color="yellow-darken-3"
                density="compact"
                half-increments
                disabled
              />
            </div>
            <p class="mt-4">{{ review.comment }}</p>
          </v-list-item>

            <!-- <v-divider class="my-4"/> -->
        </v-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors";

const colors = {
  primary_dark: Colors.cs_primary_dark,
  cs_gray: Colors.cs_opacity_gray,
};

const reviews = ref([
  {
    id: 1,
    user: "Juan Perez",
    avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
    rating: 4,
    date: "2021-10-10",
    comment: "Recomendado, me encantó. La calidad es excelente. Me encantó, lo recomiendo mucho para todos. La calidad es excelente.",
  },
  {
    id: 2,
    user: "Juan Perez",
    avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
    rating: 4,
    date: "2021-10-10",
    comment: "Excelente producto, me encantó",
  },
  {
    id: 3,
    user: "Maria Lopez",
    rating: 5,
    date: "2021-10-10",
    comment: "La mejor compra que he hecho. Me encantó, lo recomiendo mucho para todos. La calidad es excelente.",
  },
]);
</script>
