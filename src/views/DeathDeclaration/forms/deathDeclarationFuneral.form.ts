import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import type { DynamicField } from '@/models/dynamicField.model';

export const DeathDeclarationFuneralForm: DynamicField[] = [
  {
    label: 'Local do velório',
    name: 'wake_local',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
  {
    label: 'Data do velório',
    name: 'wake_date',
    input: 'text',
  },
  {
    label: 'Hora do velório',
    name: 'wake_time',
    input: 'text',
  },
  {
    label: 'Hora do funeral',
    name: 'leaving_mortuary_datetime',
    input: 'date',
  },
  {
    label: 'Data do funeral',
    name: 'funeral_datetime',
    input: 'date',
  },
  {
    label: 'Local do funeral',
    name: 'funeral_local',
    input: 'text',
    rules: fieldRules(false, null, 255),
  },
];
