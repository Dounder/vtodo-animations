<script setup lang="ts">
import useAuth from './composables/useAuth';
useAuth().refreshData();
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
