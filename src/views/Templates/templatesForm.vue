<template>
  <page :title="templatesTitle">
    <v-form
      v-if="!isLoading"
      ref="form"
      validate-on="submit"
      @submit.prevent="save"
    >
      <v-container>
        <v-row>
          <v-col :cols="6" :sm="6" :md="6">
            <v-text-field
              :id="'title_' + template.title"
              v-model="template.title"
              label="Título"
            ></v-text-field>
          </v-col>
          <v-col :cols="6" :sm="6" :md="6">
            <v-select
              :id="'group_id_' + template.group_id"
              v-model="template.group_id"
              label="Funerária"
              :items="constants.fields.find((f) => f.name === 'group_id').items"
              item-title="label"
              item-value="value"
              clearable
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="6" :sm="6" :md="6">
            <v-select
              :id="'send_type_' + template.send_type"
              v-model="template.send_type"
              label="Tipo de Envio"
              :items="
                constants.fields.find((f) => f.name === 'send_type').items
              "
              item-title="label"
              item-value="value"
              clearable
            />
          </v-col>
          <v-col :cols="6" :sm="6" :md="6">
            <v-combobox
              id="send_email_to"
              v-model="template.send_email_to"
              label="Enviar email para"
              :items="[]"
              multiple
              chips
              closable-chips
              hint="escrever email para enviar (Ex: teste@teste.pt) e carregar na tecla enter"
              persistent-hint
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="6" :sm="6" :md="6">
            <v-combobox
              id="send_email_to_cc"
              v-model="template.send_email_to_cc"
              label="Enviar email em cc para"
              :items="[]"
              multiple
              chips
              closable-chips
              hint="escrever email para enviar em cc (Ex: teste@teste.pt) e carregar na tecla enter"
              persistent-hint
            />
          </v-col>
          <v-col :cols="6" :sm="6" :md="6">
            <v-combobox
              id="send_email_to_bcc"
              v-model="template.send_email_to_bcc"
              label="Enviar email em bcc para"
              :items="[]"
              multiple
              chips
              closable-chips
              hint="escrever email para enviar em bcc (Ex: teste@teste.pt) e carregar na tecla enter"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="12" :md="12">
            <v-file-input clearable label="File input"></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="12" :md="12">
            <div>
              <!-- <div v-for="(item, index) in template.validations" :key="index">
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      :id="'item_' + index + '_name'"
                      v-model="template.validations[index].name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      :id="'item_' + index + '_phone'"
                      :v-model="template.validations[index].phone"
                      label="Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      :id="'item_' + index + '_age'"
                      :v-model="template.validations[index].age"
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
              >-->
              <v-card
                class="px-4 py-2 mb-4"
                v-for="(validation, index) in template.validations"
                :key="index"
              >
                <v-row>
                  <v-col cols="3">
                    <v-text-field
                      :id="'name_' + index"
                      v-model="validation.name"
                      label="Member Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-checkbox
                      :id="'optional_' + index"
                      v-model="validation.optional"
                      label="Opcional?"
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      :id="'field_type_' + index"
                      v-model="validation.field_type"
                      label="Tipo de Campo"
                      :items="fieldTypeItems"
                      item-title="label"
                      item-value="value"
                      clearable
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-checkbox
                      :id="'is_field_custom_' + index"
                      v-model="validation.is_field_custom"
                      label="Campo Personalizado?"
                    />
                  </v-col>
                </v-row>
                <div class="d-flex" style="justify-content: end">
                  <v-btn
                    color="red-darken-1"
                    variant="text"
                    type="button"
                    @click="removeMember(index)"
                    >Eliminar</v-btn
                  >
                </div>
              </v-card>

              <!-- Add member button -->
              <v-btn @click="addValidation" color="primary">Adicionar</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-btn color="blue-darken-1" variant="text" type="submit">
        Submeter
      </v-btn> -->
    </v-form>
  </page>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as constants from './constants';
import { getSingleTemplate } from './helper';
import VueRepeater from 'vue-repeater';
import Page from '../../components/shared/Page/page.vue';
export default defineComponent({
  name: 'TemplatesForm',
});
</script>
<script lang="ts" setup>
const route = useRoute();
const defaultObj = {
  name: null,
  optional: true,
  field_type: null,
  is_field_custom: true,
};
const template = ref({
  title: '',
  group_id: null,
  send_type: null,
  send_email_to: [],
  send_email_to_cc: [],
  send_email_to_bcc: [],
  validations: [{ ...defaultObj }],
});
const mode = ref('');
const form = ref();
const isLoading = ref(true);
const fieldTypeItems = [
  { label: 'Texto', value: 'TEXT' },
  { label: 'Verdadeiro/Falso', value: 'BOOLEAN' },
  { label: 'Inteiro', value: 'INTEGER' },
  { label: 'Opções', value: 'SELECT' },
  { label: 'Multiplas Opções', value: 'MULTISELECT' },
  { label: 'Área de Texto', value: 'TEXTAREA' },
  { label: 'Rádio', value: 'RADIO' },
  { label: 'Checkbox', value: 'CHECKBOX' },
  { label: 'Data', value: 'DATE' },
  { label: 'Data e Hora', value: 'DATETIME' },
  { label: 'Horas', value: 'TIME' },
  { label: 'Ano', value: 'YEAR' },
  { label: 'Mês', value: 'MONTH' },
  { label: 'Dia', value: 'DAY' },
  { label: 'Email', value: 'EMAIL' },
];

const templatesTitle = computed(() => {
  if (mode.value === 'create') {
    return 'Criar Template';
  } else if (mode.value === 'edit') {
    return template.value.title
      ? `Editar Template - ${template.value.title}`
      : 'Editar Template';
  }

  return '';
});

async function save() {
  const { valid } = await form.value.validate();
  console.log('save', valid);
}

const addValidation = () => {
  const keys = Object.keys(template.value.validations);
  const numberKeys = keys.map(Number);
  const newNumberKeys = numberKeys.filter((item) => {
    const toInt = parseInt(item);
    return Number.isInteger(toInt);
  });
  const greatestNumberKey =
    Math.max(...newNumberKeys) >= 0
      ? (Math.max(...newNumberKeys) + 1).toString()
      : '0';

  template.value.validations[greatestNumberKey] = defaultObj;

  //template.value.validations.push(defaultObj);
  //template.value.validations = [...template.value.validations];
};
const removeMember = (index) => {
  delete template.value.validations[index];
  // template.value.validations.splice(index, 1);
  // if (template.value.validations.length == 0) {
  //   template.value.validations.push(defaultObj);
  // }
  // template.value.validations = [...template.value.validations];
};

onBeforeMount(async () => {
  if (route.name === 'templates_edit') {
    getSingleTemplate(route.params.id as string, defaultObj).then((resp) => {
      console.log(resp);
      resp && (template.value = resp);
      mode.value = 'edit';
      isLoading.value = false;
    });
  } else if (route.name === 'templates_create') {
    mode.value = 'create';
  }
});
</script>
