<script setup lang="ts">
import { ref } from 'vue';
import { QForm } from 'quasar';
import { useAuth } from 'src/composables';
import { validationHelper } from 'src/helpers/validation.helper';
import { useRouter } from 'vue-router';

const { isLoading, error, register } = useAuth();
const { global, email, password } = validationHelper;

const router = useRouter();
const form = ref<QForm>();
const registerForm = ref({
  username: '',
  email: '',
  password: '',
});
const confirmPwd = ref('');
const isPwd = ref({ first: true, second: true });
const isVisible = ref(false);

const onSubmit = async () => {
  if (!(await form.value?.validate())) return;

  await register(registerForm.value);

  if (!error.value.hasError) {
    onReset();
    router.replace({ name: 'home' });
  }
};

const onReset = () => {
  registerForm.value = { username: '', email: '', password: '' };
  form.value?.resetValidation();
};
</script>

<template>
  <q-card class="register" :class="isVisible && 'visible'">
    <p class="register-title">Register</p>
    <q-form
      @submit="onSubmit"
      class="q-gutter-y-sm full-width register-form"
      ref="form"
    >
      <q-input
        dense
        dark
        standout
        class="full-width"
        v-model="registerForm.username"
        label="Username"
        lazy-rules
        :rules="[...global]"
        :readonly="isLoading"
        no-error-icon
      />
      <q-input
        dense
        dark
        standout
        class="full-width"
        v-model="registerForm.email"
        label="Email"
        lazy-rules
        :rules="[...global, ...email]"
        :readonly="isLoading"
        no-error-icon
      />
      <q-input
        dense
        dark
        standout
        class="full-width"
        v-model="registerForm.password"
        :type="isPwd.first ? 'password' : 'text'"
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
            color="blue-grey-3"
            :icon="isPwd.first ? 'o_visibility' : 'o_visibility_off'"
            @click="isPwd.first = !isPwd.first"
          />
        </template>
      </q-input>
      <q-input
        dense
        dark
        standout
        class="full-width"
        v-model="confirmPwd"
        :type="isPwd.second ? 'password' : 'text'"
        label="Confirm password"
        lazy-rules
        :rules="[
          ...global,
          ...password,
          (val) => val === registerForm.password || 'Password does not match',
        ]"
        :readonly="isLoading"
        no-error-icon
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            color="blue-grey-3"
            :icon="isPwd.second ? 'o_visibility' : 'o_visibility_off'"
            @click="isPwd.second = !isPwd.second"
          />
        </template>
      </q-input>
      <q-btn
        outline
        type="submit"
        class="register-btn"
        color="white"
        label="Register"
        :loading="isLoading"
      />
    </q-form>
    <p class="register-error" :class="error.hasError ? 'active' : 'inactive'">
      {{ error.msg }}
    </p>
    <q-btn
      flat
      round
      color="white"
      class="register-toggle"
      @click="isVisible = !isVisible"
      :ripple="false"
      no-caps
    >
      <q-icon name="o_add" class="register-toggle__icon" />
    </q-btn>
  </q-card>
</template>

<style lang="scss" scoped src="src/css/slices/_register.scss" />
