import { groupsList } from '@/api/groups';
import { AUTH_PERMISSIONS } from '@/authorizations/constants';
import { downloadTemplate } from './helper';

export const headers = [
  // {
  //   title: 'ID',
  //   align: 'start',
  //   key: 'id',
  //   sortable: true,
  //   roles: AUTH_PERMISSIONS.USER,
  // },
  {
    title: 'Titulo',
    align: 'start',
    key: 'title',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Funerária',
    align: 'center',
    key: 'group_id',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Ficheiro',
    align: 'center',
    key: 'file',
    sortable: true,
    roles: AUTH_PERMISSIONS.USER,
  },
  {
    title: 'Tipo de Envio',
    align: 'center',
    key: 'send_type',
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

export const nameRules = [
  (value: string) => !!value || 'O Nome da variável é Obrigatório.',
  //(value: string) => (value || '').length >= 4 || 'Mínimo 4 caracteres',
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

export const requiredFileRule = [
  (value: Blob[]) =>
    Object.keys(value).length != 0 || 'O Ficheiro é Obrigatório.',
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
    label: 'Titulo',
    type: 'text-field',
  },
  {
    name: 'group_id',
    label: 'Funerária',
    type: 'select',
    items: await getGroups(),
  },
  {
    name: 'send_type',
    type: 'multiselect',
    items: [
      { label: 'Documento', value: 'DOCUMENT' },
      { label: 'Email', value: 'EMAIL' },
      { label: 'Imagem', value: 'IMAGE' }
    ],
  },
  {
    name: 'file',
    type: 'file',
    message: 'Descarregar',
    clickFunction: downloadTemplate,
  },
];

export const dbCollections = [
  { label: 'Funerárias', value: 'GROUPS' },
  { label: 'Utilizadores', value: 'USERS' },
  { label: 'Declarações', value: 'RECORDS' },
  { label: 'Sistema', value: 'SYSTEM' },
];

export const dbCollectionsFile = [
  //{ label: 'Funerárias', value: 'GROUPS' },
  { label: 'Utilizadores', value: 'USERS' },
  { label: 'Declarações', value: 'RECORDS' },
  //{ label: 'Sistema', value: 'SYSTEM' },
];

export const usersFields = [
  { label: 'Nome', value: 'username', type: 'TEXT' },
  { label: 'Email', value: 'email', type: 'EMAIL' },
  { label: 'É staff?', value: 'is_staff', type: 'BOOLEAN' },
  { label: 'É administrador?', value: 'is_superuser', type: 'BOOLEAN' },
  { label: 'Data de criação', value: 'date_joined', type: 'DATE' },
  { label: 'Ultimo Login', value: 'last_login', type: 'DATE' },
];

export const usersFieldsFile = [{ label: 'Fotografia', value: 'file' }];

export const groupsFields = [
  { label: 'id', value: 'id', type: 'TEXT' },
  { label: 'Nome', value: 'name', type: 'TEXT' },
];

export const groupsFieldsFile = [];

export const recordsFields = [
  { label: 'Telefone', value: 'phone', type: 'TEXT' },
  { label: 'Nome', value: 'name', type: 'TEXT' },
  { label: 'Género', value: 'gender', type: 'SELECT' },
  { label: 'Email', value: 'email', type: 'TEXT' },
  { label: 'Estado Civil', value: 'marital_status', type: 'SELECT' },
  { label: 'Número CC', value: 'cc', type: 'TEXT' },
  { label: 'Validade do CC', value: 'cc_valid_until', type: 'TEXT' },
  { label: 'NIF', value: 'nif', type: 'TEXT' },
  { label: 'NISS', value: 'niss', type: 'TEXT' },
  { label: 'Data de Nascimento', value: 'birthday', type: 'DATE' },
  { label: 'Idade', value: 'age', type: 'TEXT' },
  { label: 'Morada', value: 'address', type: 'TEXT' },
  { label: 'Concelho', value: 'parish', type: 'TEXT' },
  { label: 'Município', value: 'municipality', type: 'TEXT' },
  { label: 'Distrito', value: 'district', type: 'TEXT' },
  { label: 'Nacionalidade', value: 'nationality', type: 'TEXT' },
  { label: 'Nome da Mãe', value: 'mother_name', type: 'TEXT' },
  { label: 'Nome do Pai', value: 'father_name', type: 'TEXT' },
  { label: 'Data do casamento', value: 'last_mariage_date', type: 'DATE' },
  { label: 'Nome do Cônjuge', value: 'spouse_name', type: 'TEXT' },
  { label: 'Sexo do Cônjuge', value: 'spouse_gender', type: 'TEXT' },
  { label: 'Idade do Cônjuge', value: 'spouse_gender', type: 'TEXT' },
  { label: 'Natural da Freguesia', value: 'naturality_parish', type: 'TEXT' },
  {
    label: 'Natural do Municipio',
    value: 'naturality_municipality',
    type: 'TEXT',
  },
  { label: 'Data do Falecimento', value: 'death_date', type: 'DATE' },
  { label: 'Hora do Falecimento', value: 'death_time', type: 'TIME' },
  { label: 'Morada do Falecimento', value: 'death_address', type: 'TEXT' },
  { label: 'Freguesia do Falecimento', value: 'death_parish', type: 'TEXT' },
  {
    label: 'Municipio do Falecimento',
    value: 'death_municipality',
    type: 'TEXT',
  },
  { label: 'Cemitério', value: 'cemetery', type: 'TEXT' },
  {
    label: 'Municipio do Cemitério',
    value: 'cemetery_municipality',
    type: 'TEXT',
  },
  { label: 'Número da Campa', value: 'grave_number', type: 'TEXT' },
  { label: 'Fila da Campa', value: 'grave_row', type: 'TEXT' },
  { label: 'Sitio da Campa', value: 'grave_site', type: 'TEXT' },
  { label: 'Reformado?', value: 'death_retired', type: 'BOOLEAN' },
  { label: 'Deixou bens?', value: 'death_left_assets', type: 'BOOLEAN' },
  { label: 'Fez Testamento?', value: 'death_made_will', type: 'BOOLEAN' },
  {
    label: 'Deixa Herança?',
    value: 'death_leaves_hereditary',
    type: 'BOOLEAN',
  },
  { label: 'Nome do Cabeça de Casal', value: 'double_head', type: 'TEXT' },
  {
    label: 'Morada do Cabeça de Casal',
    value: 'double_head_address',
    type: 'TEXT',
  },
  { label: 'Flores', value: 'flowers', type: 'TEXT' },
  { label: 'Localização do Falecimento', value: 'dead_location', type: 'TEXT' },
  { label: 'Causa da Morte', value: 'cause_of_death', type: 'TEXT' },
  { label: 'Mensagem da Sepultura', value: 'grave_message', type: 'TEXT' },
  { label: 'Local do Velório', value: 'wake_local', type: 'TEXT' },
  { label: 'Data do Velório', value: 'wake_date', type: 'DATE' },
  { label: 'Hora do Velório', value: 'wake_time', type: 'TIME' },
  {
    label: 'Hora de Saida da Casa Mortuária',
    value: 'leaving_mortuary_datetime',
    type: 'DATETIME',
  },
  {
    label: 'Data e Hora do Funeral',
    value: 'funeral_datetime',
    type: 'DATETIME',
  },
  { label: 'Local do Funeral', value: 'funeral_local', type: 'TEXT' },
  { label: 'Nome do Familiar', value: 'family_member_name', type: 'TEXT' },
  { label: 'CC do Familiar', value: 'family_member_cc', type: 'TEXT' },
  {
    label: 'Validade do CC do Familiar',
    value: 'family_member_cc_valid_until',
    type: 'TEXT',
  },
  {
    label: 'Parentesco do Familiar',
    value: 'family_member_kinship',
    type: 'TEXT',
  },
  {
    label: 'Telemóvel do Familiar',
    value: 'family_member_phone',
    type: 'TEXT',
  },
  {
    label: 'Número da Declaração',
    value: 'death_declaration_number',
    type: 'TEXT',
  },
];

export const recordsFieldsFile = [{ label: 'Fotografia', value: 'photo' }];

export const systemFields = [
  { label: 'Data Atual', value: 'CURRENT_DATE', type: 'DATE' },
];

export const systemFieldsFile = [];

export const dateFormat = [
  { label: 'Horas', value: 'HOURS_ONLY' },
  { label: 'Minutos', value: 'MINUTES_ONLY' },
  //{ label: 'Segundos', value: 'SECONDS_ONLY' },
  { label: 'Horas:Minutos:Segundos', value: 'HOURS_MINUTES_SECONDS' },
  { label: 'Horas:Minutos', value: 'HOURS_MINUTES' },
  //{ label: 'Minutos:Segundos', value: 'MINUTES_SECONDS' },
  { label: 'Dia/Mês/Ano', value: 'DAY_MONTH_YEAR' },
  { label: 'Mês/Ano', value: 'MONTH_YEAR' },
  { label: 'Dia/Mês', value: 'DAY_MONTH' },
  {
    label: 'Dia/Mês/Ano Horas:Minutos:Segundos',
    value: 'DAY_MONTH_YEAR_HOUR_MINUTE_SECOND',
  },
  { label: 'Dia/Mês/Ano Horas:Minutos', value: 'DAY_MONTH_YEAR_HOUR_MINUTE' },
  { label: 'Dia/Mês/Ano Horas', value: 'DAY_MONTH_YEAR_HOUR' },
  {
    label: 'Dia/Mês Horas:Minutos:Segundos',
    value: 'DAY_MONTH_HOUR_MINUTE_SECOND',
  },
  { label: 'Dia/Mês Horas:Minutos', value: 'DAY_MONTH_HOUR_MINUTE' },
  { label: 'Dia/Mês Horas', value: 'DAY_MONTH_HOUR' },
  {
    label: 'Mês/Ano Horas:Minutos:Segundos',
    value: 'MONTH_YEAR_HOUR_MINUTE_SECOND',
  },
  { label: 'Mês/Ano Horas:Minutos', value: 'MONTH_YEAR_HOUR_MINUTE' },
  { label: 'Mês/Ano Horas', value: 'MONTH_YEAR_HOUR' },
];

export const BooleanOptions = [
  { label: 'Sim', value: true, type: 'BOOLEAN' },
  { label: 'Não', value: false, type: 'BOOLEAN' },
];

export const sendTypeOptions = [
  { label: 'Email', value: 'EMAIL'},
  { label: 'Documento', value: 'DOCUMENT'},
  { label: 'Imagem', value: 'IMAGE'}
]
