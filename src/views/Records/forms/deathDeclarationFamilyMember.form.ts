import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import type { DynamicField } from '@/models/dynamicField.model';

export const DeathDeclarationFamilyMemberForm: DynamicField[] = [
  {
    label: 'Nome do familiar',
    name: 'family_member_name',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Cartão de cidadão do familiar',
    name: 'family_member_cc',
    input: 'text',
    rules: fieldRules(false, null, 16),
  },
  {
    label: 'Data de validade do cartão de cidadão do familiar',
    name: 'family_member_cc_valid_until',
    input: 'date',
  },
  {
    label: 'Parentesco do familiar',
    name: 'family_member_kinship',
    input: 'text',
    rules: fieldRules(false, null, 64),
  },
  {
    label: 'Email do familiar',
    name: 'family_member_email',
    input: 'text',
    rules: fieldRules(false, null, 32),
  },
  {
    label: 'Telemóvel do familiar',
    name: 'family_member_phone',
    input: 'text',
    rules: [
      ...fieldRules(true, 9, 32),
      (v: string) =>
        (v ? /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(v) : true) ||
        `Formato inválido`,
    ],
  },
];
