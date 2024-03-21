<template>
  <div class="h-screen">
    <v-app>
      <navbar-component />
      <v-row no-gutters>
        <v-col cols="2">
          <sidebar-component />
        </v-col>
        <v-col>
          <v-main class="ma-2">
            <slot></slot>
          </v-main>
       </v-col>
      </v-row>


      <v-main class="ma-2">
        <!-- <slot></slot> -->
      </v-main>
      <!-- </v-col>


    </v-row> -->

      <footer-component />
    </v-app>
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import SidebarComponent from "@/components/common/SidebarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_secondary,
};
</script>

<style scoped>
.container {
  width: 300px;
  height: 100%;
}
</style>
