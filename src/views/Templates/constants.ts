import { groupsList } from '@/api/groups';

export const headers = [
  { title: 'ID', align: 'start', key: 'id', sortable: true },
  {
    title: 'Titulo',
    align: 'end',
    key: 'title',
    sortable: true,
  },
  { title: 'Funerária', align: 'end', key: 'group', sortable: true },
  { title: 'Ficheiro', align: 'end', key: 'file', sortable: true },
  { title: 'Validações', align: 'end', key: 'validations', sortable: true },
  { title: 'Tipo de Envio', align: 'end', key: 'send_type', sortable: true },
  // { title: 'Destinatário', align: 'end', key: 'send_email_to', sortable: true },
  // {
  //   title: 'Destinatário cc',
  //   align: 'end',
  //   key: 'send_email_to_cc',
  //   sortable: true,
  // },
  // {
  //   title: 'Destinatário bb',
  //   align: 'end',
  //   key: 'send_email_to_bcc',
  //   sortable: true,
  // },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
  },
];

export const nameRules = [
  (value: string) => !!value || 'O Nome é Obrigatório.',
  (value: string) => (value || '').length >= 4 || 'Mínimo 4 caracteres',
  (value: string) => (value || '').length <= 60 || 'Máximo 60 caracteres',
];

export const emailRules = [
  (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Email Inválido.';
  },
];

async function getGroups() {
  const resp = await groupsList();
  if (resp.data) {
    return resp.data.map((group: any) => {
      return { label: group.name, value: group.id };
    });
  } else {
    return [];
  }
}

export const fields = [
  {
    name: 'title',
    // type: 'text-field',
    // label: 'Titulo',
    // rules: nameRules,
    // col: 12,
  },
  {
    name: 'group',
    // type: 'select',
    // label: 'Funeraria',
    // rules: [],
    // col: 12,
    items: await getGroups(),
  },
  {
    name: 'send_type',
    // type: 'select',
    // label: 'Tipo de Envio',
    // rules: [],
    // col: 12,
    items: [
      { label: 'Nenhum', value: 'NONE' },
      { label: 'Documento', value: 'DOCUMENT' },
      { label: 'Email', value: 'EMAIL' },
      { label: 'Documento e Email', value: 'DOCUMENT_EMAIL' },
    ],
  },
  // {
  //   name: 'send_email_to',
  //   type: 'text-field',
  //   label: 'Destinatário',
  //   rules: emailRules,
  //   col: 12,
  // },
  // {
  //   name: 'send_email_to_cc',
  //   type: 'text-field',
  //   label: 'Destinatário cc',
  //   rules: emailRules,
  //   col: 12,
  // },
  // {
  //   name: 'send_email_to_bcc',
  //   type: 'text-field',
  //   label: 'Destinatário bcc',
  //   rules: emailRules,
  //   col: 12,
  // },
];
