<template>
  <div>
    <div v-for="(item, index) in computedPropsData" :key="index">
      <v-row>
        <v-col cols="4">
          <v-text-field
            :id="'item_' + index + '_name'"
            :v-model="item.name + '[' + index + ']'"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            :id="'item_' + index + '_phone'"
            :v-model="item.phone + '[' + index + ']'"
            label="Phone"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            :id="'item_' + index + '_age'"
            :v-model="item.age + '[' + index + ']'"
            label="Age"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex" style="justify-content: end">
        <v-btn
          color="red-darken-1"
          variant="text"
          type="button"
          @click="removeFormRow(index)"
          >Eliminar</v-btn
        >
      </div>
    </div>
    <v-btn color="blue-darken-1" variant="text" @click="addFormRow"
      >Adicionar</v-btn
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
export default defineComponent({
  name: 'TemplatesFormRepeater',
});
</script>
<script lang="ts" setup>
const props = defineProps(['formData', 'defaultObj']);
const propsData = ref([]);
function addFormRow() {
  propsData.value.push(props.defaultObj);
}

function removeFormRow(id: any) {
  const newData = [...propsData.value];
  newData.splice(id, 1);
  propsData.value = newData;
  console.log(propsData.value)
  // if (propsData.value.length == 0) {
  //   propsData.value.push({ ...props.defaultObj });
  // }
}

const computedPropsData = computed(() => {
  return [...propsData.value];
});

onMounted(() => {
  if (props.formData) {
    propsData.value.push({ ...props.formData });
  } else {
    propsData.value.push({ ...props.defaultObj });
  }
});
</script>
