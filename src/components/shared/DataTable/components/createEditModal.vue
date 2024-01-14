<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        dark
        class="mb-2 d-flex align-self-end"
        v-bind="props"
      >
        {{ btnCreateTitle }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="mt-3">
        <span class="text-h5 ml-6">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
          <div v-if="mode === 'create'">
            <v-container v-for="field in createFields" :key="field">
              <v-row>
                <v-col class="modal__col" :cols="field.col">
                  <v-text-field
                    v-if="field.type === 'text-field'"
                    :id="field.name"
                    v-model="item[field.name]"
                    :rules="field.rules"
                    :label="field.label"
                  />

                  <v-checkbox
                    v-if="field.type === 'checkbox'"
                    :id="field.name"
                    class="modal__checkbox"
                    v-model="item[field.name]"
                    :label="field.label"
                  />

                  <v-select
                    v-if="field.type === 'select'"
                    :id="field.name"
                    v-model="item[field.name]"
                    :label="field.label"
                    :rules="field.rules"
                    :items="field.items"
                    item-title="label"
                    item-value="value"
                    clearable
                    autocomplete="off"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-else>
            <v-container v-for="field in editFields" :key="field">
              <v-row>
                <v-col class="modal__col" :cols="field.col">
                  <v-text-field
                    v-if="field.type === 'text-field'"
                    :id="field.name"
                    v-model="item[field.name]"
                    :rules="field.rules"
                    :label="field.label"
                  />

                  <v-checkbox
                    v-if="field.type === 'checkbox'"
                    :id="field.name"
                    class="modal__checkbox"
                    v-model="item[field.name]"
                    :label="field.label"
                  />

                  <v-select
                    v-if="field.type === 'select'"
                    :id="field.name"
                    v-model="item[field.name]"
                    :label="field.label"
                    :rules="field.rules"
                    :items="field.items"
                    item-title="label"
                    item-value="value"
                    clearable
                    autocomplete="off"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              {{ btnCancelTitle }}
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" type="submit">
              {{ btnActionTitle }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateEditModal',
});
</script>

<script lang="ts" setup>
import { defineProps, defineModel, ref, type PropType, watch } from 'vue';

const propsData = defineProps({
  btnActionTitle: {
    type: String,
    required: true,
  },
  btnCancelTitle: {
    type: String,
    required: true,
  },
  btnCreateTitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createFields: {
    type: Array as PropType<any>,
    required: true,
  },
  editFields: {
    type: Array as PropType<any>,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  editedItem: {
    type: Object,
    required: true,
  },
});

const dialog = defineModel() as any;
const emit = defineEmits(['close', 'save']);

const item = ref(propsData.editedItem);
const form = ref();

const close = () => emit('close');
const save = () => emit('save', form.value, item.value);

watch(propsData, (newProps) => {
  item.value = newProps.editedItem;
});
</script>
<style lang="scss">
.modal__col {
  padding-bottom: 0;
}
.modal__checkbox {
  height: 2rem;
}
</style>
