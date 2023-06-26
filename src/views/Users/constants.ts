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
  { title: 'Ativo', align: 'end', key: 'is_active', sortable: true },
  { title: 'Estado', align: 'end', key: 'status', sortable: true },
  {
    title: 'Actions',
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


