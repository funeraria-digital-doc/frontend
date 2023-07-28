import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import type { DynamicField } from '@/models/dynamicField.model';

export const DeathDeclarationDeathForm: DynamicField[] = [
  {
    label: 'Data do falecimento',
    name: 'death_date',
    input: 'date',
  },
  {
    label: 'Hora do falecimento',
    name: 'death_time',
    input: 'date',
  },
  {
    label: 'Morada do falecimento',
    name: 'death_address',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Freguesia do falecimento',
    name: 'death_parish',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Freguesia do falecimento',
    name: 'death_municipality',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Cemitério',
    name: 'cemetery',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Município do cemitério',
    name: 'cemetery_municipality',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Número da campa',
    name: 'grave_number',
    input: 'text',
    rules: fieldRules(false, null, 16),
  },
  {
    label: 'Fila da campa',
    name: 'grave_row',
    input: 'text',
    rules: fieldRules(false, null, 16),
  },
  {
    label: 'Sítio da campa',
    name: 'grave_site',
    input: 'text',
    rules: fieldRules(false, null, 64),
  },
  {
    label: 'Reformado ?',
    name: 'death_retired',
    input: 'checkbox',
  },
  {
    label: 'Deixou bens ?',
    name: 'death_left_assets',
    input: 'checkbox',
  },
  {
    label: 'Testamento ?',
    name: 'death_made_will',
    input: 'checkbox',
  },
  {
    label: 'Herança ?',
    name: 'death_leaves_hereditary',
    input: 'checkbox',
  },
  {
    label: 'Nome do cabeça de casal',
    name: 'double_head',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Morada do cabeça de casal',
    name: 'double_head_address',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Flores',
    name: 'flowers',
    input: 'text',
    rules: fieldRules(false, null, 1024),
  },
  {
    label: 'Localização do falecimento',
    name: 'dead_location',
    input: 'text',
    rules: fieldRules(false, null, 128),
  },
  {
    label: 'Causa da morte',
    name: 'cause_of_death',
    input: 'text',
    rules: fieldRules(false, null, 128),
  },
  {
    label: 'Mensagem da sepultura',
    name: 'grave_message',
    input: 'text',
    rules: fieldRules(false, null, 128),
  },
];
