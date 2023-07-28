import { groupsList } from '@/api/groups';

export const headers = [
  { title: 'ID', align: 'start', key: 'id', sortable: true },
  {
    title: 'Nome de utilizador',
    align: 'end',
    key: 'username',
    sortable: true,
  },
  { title: 'Email', align: 'end', key: 'email', sortable: true },
  { title: 'Funeraria', align: 'end', key: 'group', sortable: true },
  { title: 'Admin', align: 'end', key: 'is_superuser', sortable: true },
  { title: 'Staff', align: 'end', key: 'is_staff', sortable: true },
  { title: 'Estado', align: 'end', key: 'status', sortable: true },
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
  (value: string) => !!value || 'O Email é Obrigatório.',
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
    name: 'username',
    type: 'text-field',
    label: 'Nome de utilizador',
    rules: nameRules,
    col: 12,
  },
  {
    name: 'email',
    type: 'text-field',
    label: 'Email',
    rules: emailRules,
    col: 12,
  },
  {
    name: 'group',
    type: 'select',
    label: 'Funeraria',
    rules: [],
    col: 12,
    items: await getGroups(),
  },
  {
    name: 'status',
    type: 'select',
    label: 'Estado',
    rules: [],
    col: 12,
    items: [
      { label: 'Inativo', value: '1' },
      { label: 'Ativo', value: '2' },
      { label: 'Suspenso', value: '3' },
    ],
  },
  {
    name: 'is_superuser',
    type: 'checkbox',
    label: 'Admin',
    col: 4,
    true_value_label: 'Sim',
    false_value_label: 'Não',
  },
  {
    name: 'is_staff',
    type: 'checkbox',
    label: 'Staff',
    col: 4,
    true_value_label: 'Sim',
    false_value_label: 'Não',
  },
];
