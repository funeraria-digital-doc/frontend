import type { DynamicField } from '@/models/dynamicField.model';

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
  },
  {
    label: 'Idade do cônjuge',
    name: 'spouse_age',
    input: 'text',
  },
];
