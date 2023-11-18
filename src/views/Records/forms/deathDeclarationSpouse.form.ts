import type { DynamicField } from '@/models/dynamicField.model';
import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';

export const DeathDeclarationSpouseForm: DynamicField[] = [
  {
    label: 'Data de casamento',
    name: 'last_mariage_date',
    input: 'date',
  },
  {
    label: 'Nome do cônjuge',
    name: 'spouse_name',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Sexo do cônjuge',
    name: 'spouse_gender',
    input: 'select',
    items: [
      { label: 'Masculino', value: 'MALE' },
      { label: 'Feminino', value: 'WOMAN' },
      { label: 'Outro', value: 'OTHER' },
    ],
    rules: fieldRules(true, null, null),
  },
  {
    label: 'Idade do cônjuge',
    name: 'spouse_age',
    input: 'text',
  },
];
