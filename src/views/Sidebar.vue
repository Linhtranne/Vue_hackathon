<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer floating permanent>
          <v-list density="compact" nav>
            <v-list-item
              title="Dashboard"
              @click="navigateTo('/admin')"
            ></v-list-item>
            <v-list-item
              title="Category"
              @click="navigateTo('/admin/manager-category')"
            ></v-list-item>
            <v-list-item
              title="Product"
              @click="navigateTo('/admin/manager-product')"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  // Access Vue Router
  const router = useRouter();
  
  // Method to navigate to the appropriate route
  const navigateTo = (path) => {
    router.push(path);
  };
  </script>
  