<script setup lang="ts">
import { useDialog, useNotify } from 'src/composables';
import { toRefs, ref } from 'vue';

const { onConfirm } = useDialog();
const { onWarning } = useNotify();

const props = defineProps<{
  completed: boolean;
  loading: boolean;
  editing: boolean;
}>();

const emits = defineEmits(['on:complete', 'on:delete', 'on:edit', 'on:save']);
const { loading, editing } = toRefs(props);
const isCompleted = ref(props.completed);

const handleComplete = () =>
  !editing.value && emits('on:complete', isCompleted.value);

const handleDelete = () => onConfirm().onOk(() => emits('on:delete'));

const handleSave = () => {
  if (editing.value) return emits('on:save');

  isCompleted.value
    ? onWarning('Only can edit uncompleted Todos')
    : emits('on:edit');
};
</script>

<template>
  <q-checkbox
    v-model="isCompleted"
    size="sm"
    @update:model-value="handleComplete"
    :disable="loading || editing"
  >
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      class="bg-primary text-white"
      v-if="!editing"
    >
      Mark as {{ isCompleted ? 'uncompleted' : 'completed' }}
    </q-tooltip>
  </q-checkbox>
  <q-btn
    flat
    round
    dense
    color="negative"
    icon="o_delete_forever"
    :disable="editing"
    @click="handleDelete"
  >
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      class="bg-negative text-white"
    >
      Delete todo
    </q-tooltip>
  </q-btn>
  <q-btn
    flat
    round
    dense
    color="secondary"
    :icon="editing ? 'o_save' : 'o_edit'"
    @click="handleSave"
  >
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      class="bg-secondary text-white"
    >
      {{ editing ? 'Save Todo' : 'Edit Todo' }}
    </q-tooltip>
  </q-btn>
</template>

<style lang="scss" scoped></style>
