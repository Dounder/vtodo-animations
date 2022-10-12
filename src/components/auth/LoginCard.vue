<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QForm } from 'quasar';

import useAuth from 'src/composables/useAuth';
import { validationHelper } from 'src/helpers/validation.helper';

const { login, isLoading, error } = useAuth();
const router = useRouter();
const loginForm = ref({ email: '', password: '' });
const isPwd = ref(true);
const form = ref<null | QForm>(null);

const { global, email, password } = validationHelper;

const onSubmit = async () => {
  if (!(await form.value?.validate())) return;

  await login(loginForm.value);

  if (!error.value.hasError) {
    onReset();
    router.replace({ name: 'home' });
  }
};

const onReset = () => {
  loginForm.value = { email: '', password: '' };
  form.value?.resetValidation();
};
</script>

<template>
  <q-card class="card">
    <q-card-section>
      <p class="card-title">Login</p>
    </q-card-section>
    <q-form @submit="onSubmit" class="q-gutter-y-md full-width" ref="form">
      <q-input
        class="full-width"
        v-model="loginForm.email"
        label="Email"
        lazy-rules
        :rules="[...global, ...email]"
        :readonly="isLoading"
        no-error-icon
      />
      <q-input
        class="full-width"
        v-model="loginForm.password"
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        lazy-rules
        :rules="[...global, ...password]"
        :readonly="isLoading"
        no-error-icon
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            color="grey"
            :icon="isPwd ? 'o_visibility' : 'o_visibility_off'"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        outline
        type="submit"
        class="card-btn"
        color="primary"
        label="Login"
        :loading="isLoading"
      />
    </q-form>
    <q-card-section>
      <p :class="error.hasError ? 'active' : 'inactive'">{{ error.msg }}</p>
      <p class="card-text">Forgot your password?</p>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 25rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  &-title {
    font-size: 3rem;
    line-height: 1.1;
    color: $primary;
    position: relative;
    margin: 0;
    &::before {
      content: '';
      width: 5px;
      height: 100%;
      background: $primary;
      position: absolute;
      left: -3rem;
    }
  }
  &-btn {
    width: 100%;
    height: 3.5rem;
  }
  &-text {
    color: rgba($dark, 0.5);
    text-align: center;
    font-size: 1rem;
    transition: all 0.5s ease;
    &:hover {
      color: darken($dark, 0.5);
      transition: all 0.5s ease;
      cursor: pointer;
      user-select: none;
    }
  }
  .inactive {
    width: 100%;
    height: 0;
    font-size: 0.8rem;
    text-align: center;
    background: rgba($negative, 0.6);
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.5s ease;
  }
  .active {
    @extend .inactive;
    padding: 1rem;
    height: auto;
  }
}

.q-card__section {
  padding: 0;
  width: 100%;
}
</style>
