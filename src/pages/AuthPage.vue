<script setup lang="ts">
import LoginCard from 'src/components/auth/LoginCard.vue';
import RegisterCard from 'src/components/auth/RegisterCard.vue';
</script>

<template>
  <q-page class="column justify-center items-center">
    <div class="container">
      <LoginCard />
      <RegisterCard />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}
</style>
