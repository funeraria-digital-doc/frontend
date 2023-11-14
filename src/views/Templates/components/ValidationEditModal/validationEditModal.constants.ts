export const validationFieldTypeItems = [
  { label: 'Texto', value: 'TEXT' },
  { label: 'Verdadeiro/Falso', value: 'BOOLEAN' },
  { label: 'Inteiro', value: 'INTEGER' },
  { label: 'Opções', value: 'SELECT' },
  { label: 'Multiplas Opções', value: 'MULTISELECT' },
  { label: 'Área de Texto', value: 'TEXTAREA' },
  { label: 'Data', value: 'DATE' },
  { label: 'Email', value: 'EMAIL' }
];

export const maxRules = (validation: any) => [
  (value: string) => {
    if (value == '' || value == null) {
      return true;
    } else {
      if (value < validation.min) {
        return 'Máximo tem de ser maior que o mínimo';
      } else {
        return true;
      }
    }
  },
];

export const defaultValueRules = (validation: any) => [
  (value: string) => {
    if (value == '' || value == null) {
      return true;
    } else {
      if (validation.field_type === 'INTEGER') {
        if (parseInt(value) >= 0 && parseInt(validation.max) >= 0) {
          if (parseInt(value) > parseInt(validation.max)) {
            return 'Valor por defeito tem de ser inferior ao máximo.';
          }
        }
        if (parseInt(value) >= 0 && parseInt(validation.min) >= 0)
          if (parseInt(validation.min) > parseInt(value)) {
            return 'Valor por defeito tem de ser superior ao mínimo.';
          }
      }
    }
    return true;
  },
];
