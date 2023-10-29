import { AUTH_PERMISSIONS } from '@/authorizations/constants';

export const headers = [
  {
    title: 'ID',
    align: 'start',
    key: 'id',
    sortable: true,
    roles: AUTH_PERMISSIONS.SUPER,
  },
  {
    title: 'Nome',
    align: 'end',
    key: 'name',
    sortable: true,
    roles: AUTH_PERMISSIONS.SUPER,
  },
  {
    title: 'Ações',
    key: 'actions',
    align: 'end',
    sortable: false,
    roles: AUTH_PERMISSIONS.SUPER,
  },
];

export const nameRules = [
  (value: string) => !!value || 'O Nome é Obrigatório.',
  (value: string) => (value || '').length >= 4 || 'Mínimo 4 caracteres',
  (value: string) => (value || '').length <= 60 || 'Máximo 60 caracteres',
];
