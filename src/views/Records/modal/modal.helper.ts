export function getFieldRules(validation: any) {
  const rules = [];
  if (!validation.optional || validation.min > 0) {
    if (validation.field_type === 'BOOLEAN') {
      console.log('aqui');
      rules.push((value: any) => {
        console.log('valor', typeof value);
        return (typeof value === 'boolean' && !!value) || 'Campo Obrigatório.';
      });
    } else {
      rules.push((value: any) => !!value || 'Campo Obrigatório.');
    }
  }
  if (validation.min > 0) {
    console.log('type: ' + validation.field_type);
    if (['TEXT', 'TEXTAREA'].includes(validation.field_type)) {
      rules.push(
        (value: any) =>
          value.length >= validation.min ||
          'Minímo de ' + validation.min + ' caractéres'
      );
    } else if (validation.field_type === 'INTEGER') {
      rules.push(
        (value: any) =>
          value >= validation.min || 'Valor minímo de ' + validation.min
      );
    } else if (validation.field_type === 'BOOLEAN') {
      rules.push(
        (value: any) => !!value || 'Valor minímo de ' + validation.min
      );
    } else {
      rules.push((value: any) => {
        return (
          value.length >= validation.min ||
          'Obrigatório escolher pelo menos ' + validation.min + ' opções'
        );
      });
    }
  }
  if (validation.max > 0) {
    if (['TEXT', 'TEXTAREA'].includes(validation.field_type)) {
      rules.push(
        (value: any) =>
          value.length <= validation.max ||
          'Máximo de ' + validation.max + ' caractéres'
      );
    } else if (validation.field_type === 'INTEGER') {
      rules.push(
        (value: any) =>
          value <= validation.max || 'Valor máximo de ' + validation.max
      );
    } else if (
      ['DATE', 'TIME', 'DATETIME', 'EMAIL', 'BOOLEAN'].includes(
        validation.field_type
      )
    ) {
      //nada acontece
    } else {
      rules.push(
        (value: any) =>
          value.length <= validation.max ||
          'Máximo de ' + validation.max + ' opções'
      );
    }
  }
  if (validation.field_type === 'EMAIL') {
    rules.push((value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Email inválido.';
    });
  }
  return rules;
}
