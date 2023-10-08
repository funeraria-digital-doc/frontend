import { groupsList } from '@/api/groups';
import { AUTH_PERMISSIONS } from '@/authorizations/constants';

export const headers = [
  {
    title: 'Nome',
    align: 'start',
    key: 'name',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Telefone',
    align: 'end',
    key: 'family_member_phone',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Email',
    align: 'end',
    key: 'email',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Género',
    align: 'end',
    key: 'gender',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Funerária',
    align: 'end',
    key: 'group_id',
    sortable: true,
    roles: AUTH_PERMISSIONS.SUPER,
  },
  {
    title: 'Estado',
    align: 'end',
    key: 'status',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    roles: AUTH_PERMISSIONS.USER,
  },
];
export const fields = [
  {
    name: 'name',
    type: 'text-field',
  },
  {
    name: 'group_id',
    type: 'select',
    items: await getGroups(),
  },
  {
    name: 'gender',
    type: 'select',
    items: [
      { label: 'Feminino', value: 'WOMAN' },
      { label: 'Masculino', value: 'MALE' },
      { label: 'Outro', value: 'OTHER' },
    ],
  },
  {
    name: 'status',
    type: 'select',
    items: [
      { label: 'Inativo', value: 'INACTIVE' },
      { label: 'Ativo', value: 'ACTIVE' },
      { label: 'Pendente', value: 'PENDING' },
      { label: 'Finalizado', value: 'COMPLETED' },
      { label: 'Arquivado', value: 'ARCHIVED' },
    ],
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
