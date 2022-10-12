<script setup lang="ts">
import { useAuth } from 'src/composables';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { logout } = useAuth();
const loading = ref(false);

const handleLogout = () => {
  loading.value = true;

  setTimeout(() => {
    router.replace({ name: 'login' });
    logout();
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <q-page-sticky position="bottom-left" :offset="[30, 30]">
    <q-btn
      fab
      color="secondary"
      icon="o_logout"
      :loading="loading"
      @click="handleLogout"
    >
      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        class="text-overline bg-secondary"
      >
        Log out
      </q-tooltip>
    </q-btn>
  </q-page-sticky>
</template>
