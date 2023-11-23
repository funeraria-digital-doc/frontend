import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import type { DynamicField } from '@/models/dynamicField.model';

export const DeathDeclarationDefunctForm: DynamicField[] = [
  {
    label: 'Carregar fotografia',
    name: 'photo',
    input: 'file',
  },
  {
    items: [
      { label: 'Ativo', value: 'ACTIVE' },
      { label: 'Arquivado', value: 'ARCHIVED' },
    ],
    label: 'Estado',
    name: 'status',
    rules: fieldRules(true, null, null),
    value: 'ACTIVE',
    input: 'select',
  },
  {
    label: 'Nome',
    name: 'name',
    input: 'text',
    rules: fieldRules(true, null, 255),
  },
  {
    label: 'Sexo',
    name: 'gender',
    input: 'select',
    items: [
      { label: 'Masculino', value: 'MALE' },
      { label: 'Feminino', value: 'WOMAN' },
      { label: 'Outro', value: 'OTHER' },
    ],
    rules: fieldRules(true, null, 64),
  },
  {
    label: 'Estado civil',
    name: 'marital_status',
    input: 'select',
    items: [
      { label: 'Solteiro', value: 'SINGLE' },
      { label: 'Casado', value: 'MARIED' },
      { label: 'Divorciado', value: 'DIVORCED' },
      { label: 'Viúvo', value: 'WIDOWER' },
    ],
    rules: fieldRules(true, null, 64),
  },
  {
    label: 'Cartão de cidadão',
    name: 'cc',
    input: 'text',
    rules: fieldRules(false, null, 16),
  },
  {
    label: 'Validade do cartão de cidadão',
    name: 'cc_valid_until',
    input: 'date',
  },
  {
    label: 'Número de identificação fiscal',
    name: 'nif',
    input: 'text',
    rules: fieldRules(false, null, 16),
  },
  {
    label: 'Número de identificação de segurança social',
    name: 'niss',
    input: 'text',
    rules: fieldRules(false, null, 16),
  },
  {
    label: 'Data de nascimento',
    name: 'birthday',
    input: 'date',
  },
  {
    label: 'Idade',
    name: 'age',
    input: 'text',
  },
  {
    label: 'Morada',
    name: 'address',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Freguesia',
    name: 'parish',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Município',
    name: 'municipality',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Natural da freguesia',
    name: 'naturality_parish',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Natural do município',
    name: 'naturality_municipality',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Nome da mãe',
    name: 'mother_name',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Nome do pai',
    name: 'father_name',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
];
