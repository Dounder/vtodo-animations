<script setup lang="ts">
import { QForm } from 'quasar';
import { useNotify, useTodo } from 'src/composables';
import { ref, onBeforeMount } from 'vue';
import TodoCard from '../components/todo/TodoCard.vue';
import NoData from 'src/components/shared/NoData.vue';
import HomeFab from 'src/components/shared/HomeFab.vue';

const { getTodos, gettingTodos, creatingTodo, createTodo, todos } = useTodo();
const { onError, onSuccess } = useNotify();

onBeforeMount(() => getTodos());

const text = ref('');
const form = ref<QForm | null>(null);

const onCreateTodo = async () => {
  if (!form.value?.validate) return;

  const { ok, msg } = await createTodo(text.value);

  if (!ok) return onError(msg);

  onSuccess(msg);
  form.value.resetValidation();
  text.value = '';
};
</script>

<template>
  <q-page padding>
    <q-form @submit="onCreateTodo" class="q-mb-lg" ref="form">
      <q-input
        v-model="text"
        type="text"
        label="New todo"
        lazy-rules
        :rules="[(val) => val.length > 2 || 'Text must be at least 2 long']"
        :loading="creatingTodo"
        :disable="gettingTodos"
        no-error-icon
      />
    </q-form>
    <q-spinner-facebook
      v-if="gettingTodos"
      color="primary"
      size="8rem"
      :thickness="5"
      class="flex flex-center q-mx-auto"
    />
    <section v-else>
      <transition name="switch" mode="out-in">
        <NoData v-if="!todos.length" />
        <div class="container" v-else>
          <transition-group name="todo" appear>
            <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
          </transition-group>
        </div>
      </transition>
    </section>
    <HomeFab />
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  width: 80vw;
  margin: 0 auto;
  padding: 2rem 0;
}
.container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
