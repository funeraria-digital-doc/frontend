import { AUTH_PERMISSIONS } from '@/authorizations/constants';
import { generateDocuments } from './helper';

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
    title: 'Gerar Documentos',
    align: 'end',
    key: 'generate_documents',
    sortable: false,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    roles: AUTH_PERMISSIONS.USER,
  },
];
export const fields = (generateDocumentsCallback: Function) => [
  {
    name: 'name',
    type: 'text-field',
  },
  {
    name: 'group_id',
    type: 'select',
    items: [],
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
  {
    name: 'generate_documents',
    type: 'button',
    message: 'Gerar Documentos',
    clickFunction: (item: any) =>
      generateDocuments(item, generateDocumentsCallback),
  },
];

// export const toSendOptionsItems = [
//   { label: 'Documento', value: 'DOCUMENT' },
//   { label: 'Email', value: 'EMAIL' },
//   { label: 'Documento e Email', value: 'DOCUMENT_EMAIL' },
// ]
