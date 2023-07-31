import { groupsList } from '@/api/groups';

export const headers = [
  { title: 'ID', align: 'start', key: 'id', sortable: true },
  {
    title: 'Titulo',
    align: 'end',
    key: 'title',
    sortable: true,
  },
  { title: 'Funerária', align: 'end', key: 'group_id', sortable: true },
  { title: 'Ficheiro', align: 'end', key: 'file', sortable: true },
  { title: 'Tipo de Envio', align: 'end', key: 'send_type', sortable: true },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
  },
];

export const nameRules = [
  (value: string) => !!value || 'O Nome da variável é Obrigatório.',
  (value: string) => (value || '').length >= 4 || 'Mínimo 4 caracteres',
  (value: string) => (value || '').length <= 60 || 'Máximo 60 caracteres',
];

export const textRules = [
  (value: string) => {
    if (value == '' || value == null) {
      return true;
    } else {
      if (value.length < 4) {
        return 'Mínimo 4 caracteres';
      } else if (value.length > 60) {
        return 'Máximo 60 caracteres';
      } else {
        return true;
      }
    }
  },
];

export const labelRules = [
  (value: string) => !!value || 'O Nome do campo é Obrigatório.',
  (value: string) => (value || '').length >= 4 || 'Mínimo 4 caracteres',
  (value: string) => (value || '').length <= 60 || 'Máximo 60 caracteres',
];

export const groupRules = [
  (value: string) => !!value || 'É obrigatório escolher 1 opção.',
];

export const fieldTypeRules = [
  (value: string[]) => !!value || 'O Tipo de Campo é Obrigatório.',
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
    type: 'text-field',
  },
  {
    name: 'group_id',
    type: 'select',
    items: await getGroups(),
  },
  {
    name: 'send_type',
    type: 'select',
    items: [
      { label: 'Nenhum', value: 'NONE' },
      { label: 'Documento', value: 'DOCUMENT' },
      { label: 'Email', value: 'EMAIL' },
      { label: 'Documento e Email', value: 'DOCUMENT_EMAIL' },
    ],
  },
];

export const dbCollections = [
  { label: 'Funerárias', value: 'GROUPS' },
  { label: 'Utilizadores', value: 'USERS' },
  { label: 'Declarações', value: 'RECORDS' },
];

export const usersFields = [
  { label: 'Nome', value: 'username', type: 'TEXT' },
  { label: 'Email', value: 'email', type: 'EMAIL' },
  { label: 'É staff?', value: 'is_staff', type: 'BOOLEAN' },
  { label: 'É administrador?', value: 'is_superuser', type: 'BOOLEAN' },
  { label: 'Data de criação', value: 'date_joined', type: 'DATE' },
  { label: 'Ultimo Login', value: 'last_login', type: 'DATE' },
];

export const groupsFields = [
  { label: 'id', value: 'id', type: 'TEXT' },
  { label: 'Nome', value: 'name', type: 'TEXT' },
];

export const recordsFields = [
  { label: 'Telefone', value: 'phone', type: 'TEXT' },
  { label: 'Nome', value: 'name', type: 'TEXT' },
  { label: 'Género', value: 'gender', type: 'TEXT' },
];

export const dateFormat = [
  { label: 'Horas', value: 'HOURS_ONLY' },
  { label: 'Minutos', value: 'MINUTES_ONLY' },
  { label: 'Segundos', value: 'SECONDS_ONLY' },
  { label: 'Horas/Minutos/Segundos', value: 'HOURS_MINUTES_SECONDS' },
  { label: 'Horas/Minutos', value: 'HOURS_MINUTES' },
  { label: 'Minutos/Segundos', value: 'MINUTES_SECONDS' },
  { label: 'Dia/Mês/Ano', value: 'DAY_MONTH_YEAR' },
  { label: 'Mês/Ano', value: 'MONTH_YEAR' },
  { label: 'Dia/Mês', value: 'DAY_MONTH' },
  {
    label: 'Dia/Mês/Ano Horas/Minutos/Segundos',
    value: 'DAY_MONTH_YEAR_HOUR_MINUTE_SECOND',
  },
  { label: 'Dia/Mês/Ano Horas/Minutos', value: 'DAY_MONTH_YEAR_HOUR_MINUTE' },
  { label: 'Dia/Mês/Ano Horas', value: 'DAY_MONTH_YEAR_HOUR' },
  {
    label: 'Dia/Mês Horas/Minutos/Segundos',
    value: 'DAY_MONTH_HOUR_MINUTE_SECOND',
  },
  { label: 'Dia/Mês Horas/Minutos', value: 'DAY_MONTH_HOUR_MINUTE' },
  { label: 'Dia/Mês Horas', value: 'DAY_MONTH_HOUR' },
  {
    label: 'Mês/Ano Horas/Minutos/Segundos',
    value: 'MONTH_YEAR_HOUR_MINUTE_SECOND',
  },
  { label: 'Mês/Ano Horas/Minutos', value: 'MONTH_YEAR_HOUR_MINUTE' },
  { label: 'Mês/Ano Horas', value: 'MONTH_YEAR_HOUR' },
];

export const BooleanOptions = [
  { label: 'Sim', value: true, type: 'BOOLEAN' },
  { label: 'Não', value: false, type: 'BOOLEAN' }
];
