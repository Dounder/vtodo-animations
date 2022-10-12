<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { QForm } from 'quasar';

import TodoCardActions from './TodoCardActions.vue';
import { Todo } from 'src/interfaces/todo.interface';
import { useNotify, useTodo } from 'src/composables';

const { updateTodo, updatingTodo, deleteTodo } = useTodo();
const { onSuccess, onError } = useNotify();

const props = defineProps<{ todo: Todo }>();
const { todo } = toRefs(props);

const editable = ref(false);
const form = ref<QForm | null>(null);

const handleComplete = async (val: boolean) => {
  const { ok, msg } = await updateTodo({ ...todo.value, completed: val });

  if (!ok) return onError(msg);

  onSuccess(msg);
};

const handleDelete = async () => {
  const { ok, msg } = await deleteTodo(todo.value.id);

  if (!ok) return onError(msg);

  onSuccess(msg);
};

const handleEdit = async () => {
  if (!form.value?.validate) return;

  if (todo.value.text.length < 2)
    return onError('Text must be at least 2 long');

  const { ok, msg } = await updateTodo({ ...todo.value });

  if (!ok) return onError(msg);

  onSuccess(msg);
  form.value.resetValidation();
  editable.value = false;
};
</script>

<template>
  <q-card class="card" :class="todo.completed && 'completed'" flat bordered>
    <q-card-section class="card-section">
      <div class="card-time">
        {{ new Date(todo.createdAt).toDateString() }}
      </div>
      <transition name="switch" mode="out-in">
        <div
          class="text-caption card-body"
          :class="{
            'completed-text': todo.completed,
            'overflow-auto': !editable,
          }"
          v-if="!editable"
        >
          {{ todo.text }}
        </div>
        <q-form @submit="handleEdit" ref="form" class="card-body" v-else>
          <q-input
            autofocus
            rows="4"
            no-error-icon
            v-model="todo.text"
            type="textarea"
            label="New todo"
            :loading="updatingTodo"
          />
        </q-form>
      </transition>
      <section class="card-actions">
        <TodoCardActions
          :completed="todo.completed"
          :loading="updatingTodo"
          :editing="editable"
          @on:complete="handleComplete"
          @on:delete="handleDelete"
          @on:edit="editable = true"
          @on:save="handleEdit"
        />
      </section>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-height: 12rem;
  margin-bottom: 1rem;
  transition: all 0.5s ease;
  &-section {
    height: 100%;
    transition: all 0.5s ease;
  }
  &-body {
    transition: all 0.5s ease;
    height: calc(100% - 2.5rem);
    margin-top: 2.5rem;
    word-break: break-all;
  }
  &-time {
    height: fit-content;
    position: absolute;
    inset: 1rem 1rem;
    opacity: 0.5;
    font-size: 0.6rem;
    letter-spacing: 0.16667em;
  }
  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
  }
}

.completed {
  background: rgba($secondary, 0.1);
  transition: all 0.5s ease;
  &-text {
    color: grey;
    text-decoration: line-through;
    animation: strike 0.5s linear;
  }
}

@keyframes strike {
  from {
    text-decoration-color: transparent;
  }
  to {
    text-decoration-color: auto;
  }
}
</style>
