import { groupsList } from '@/api/groups';
import { AUTH_PERMISSIONS } from '@/authorizations/constants';

export const headers = [
  {
    title: 'ID',
    align: 'start',
    key: 'id',
    sortable: true,
    roles: AUTH_PERMISSIONS.STAFF,
  },
  {
    title: 'Nome de utilizador',
    align: 'end',
    key: 'username',
    sortable: true,
    roles: AUTH_PERMISSIONS.STAFF,
  },
  {
    title: 'Email',
    align: 'end',
    key: 'email',
    sortable: true,
    roles: AUTH_PERMISSIONS.STAFF,
  },
  {
    title: 'Funeraria',
    align: 'end',
    key: 'group',
    sortable: true,
    roles: AUTH_PERMISSIONS.SUPER,
  },
  {
    title: 'Admin',
    align: 'end',
    key: 'is_superuser',
    sortable: true,
    roles: AUTH_PERMISSIONS.SUPER,
  },
  {
    title: 'Gestor',
    align: 'end',
    key: 'is_staff',
    sortable: true,
    roles: AUTH_PERMISSIONS.STAFF,
  },
  {
    title: 'Estado',
    align: 'end',
    key: 'status',
    sortable: true,
    roles: AUTH_PERMISSIONS.STAFF,
  },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    roles: AUTH_PERMISSIONS.STAFF,
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
    roles: AUTH_PERMISSIONS.STAFF,
    createDisplayRole: AUTH_PERMISSIONS.STAFF,
    editDisplayRole: AUTH_PERMISSIONS.SUPER,
  },
  {
    name: 'email',
    type: 'text-field',
    label: 'Email',
    rules: emailRules,
    col: 12,
    roles: AUTH_PERMISSIONS.STAFF,
    createDisplayRole: AUTH_PERMISSIONS.STAFF,
    editDisplayRole: AUTH_PERMISSIONS.STAFF,
  },
  {
    name: 'group',
    type: 'select',
    label: 'Funeraria',
    rules: [],
    col: 12,
    items: await getGroups(),
    roles: AUTH_PERMISSIONS.SUPER,
    createDisplayRole: AUTH_PERMISSIONS.SUPER,
    editDisplayRole: AUTH_PERMISSIONS.SUPER,
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
    roles: AUTH_PERMISSIONS.STAFF,
    createDisplayRole: AUTH_PERMISSIONS.SUPER,
    editDisplayRole: AUTH_PERMISSIONS.STAFF,
  },
  {
    name: 'is_superuser',
    type: 'checkbox',
    label: 'Admin',
    col: 4,
    true_value_label: 'Sim',
    false_value_label: 'Não',
    roles: AUTH_PERMISSIONS.SUPER,
    createDisplayRole: AUTH_PERMISSIONS.SUPER,
    editDisplayRole: AUTH_PERMISSIONS.SUPER,
  },
  {
    name: 'is_staff',
    type: 'checkbox',
    label: 'Gestor',
    col: 4,
    true_value_label: 'Sim',
    false_value_label: 'Não',
    roles: AUTH_PERMISSIONS.SUPER,
    createDisplayRole: AUTH_PERMISSIONS.SUPER,
    editDisplayRole: AUTH_PERMISSIONS.SUPER,
  },
];
