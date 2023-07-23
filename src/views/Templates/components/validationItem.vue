<template>
  <v-row v-if="!props.validation.name">
    <v-col cols="6">
      <v-text-field
        :id="'name_' + props.index"
        v-model="name"
        :rules="nameRules"
        label="Nome"
      ></v-text-field>
    </v-col>
    <v-btn
      color="blue-darken-1"
      variant="text"
      type="button"
      class="d-flex flex-column align-self-center"
      @click="handleSave"
    >
      Guardar
    </v-btn>
  </v-row>
  <v-row v-else>
    <v-btn
      color="blue-darken-1"
      variant="text"
      type="button"
      @click="openEditModal"
    >
      {{ props.validation.name }}
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  defineProps,
  defineEmits,
  ref,
  onBeforeMount,
} from 'vue';
export default defineComponent({
  name: 'ValidationItem',
});
</script>
<script lang="ts" setup>
const props = defineProps(['validation', 'index']);
const nameRules = [
  (value: string) => !!value || 'O Nome é Obrigatório.',
  (value: string) => (value || '').length >= 4 || 'Mínimo 4 caracteres',
  (value: string) => (value || '').length <= 60 || 'Máximo 60 caracteres',
];
const name = ref('');
const emit = defineEmits();

const handleSave = () => {
  emit('save', name.value, props.index);
};

const openEditModal = () => {
  emit('edit', props.index);
};
onBeforeMount(async () => {
  name.value = props.validation.name;
});
</script>
