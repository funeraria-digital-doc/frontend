export const fieldRules = (
  isRequired: boolean,
  minLength: number | null,
  maxLength: number | null
) => {
  const rules = [];

  isRequired && rules.push((v: string) => !!v || "Campo obrigatório");

  minLength &&
    rules.push(
      (v: string) =>
        (v ? v.length > minLength : true) || `Minimo ${maxLength} caracteres`
    );

  maxLength &&
    rules.push(
      (v: string) =>
        (v ? v.length < maxLength : true) || `Máximo ${maxLength} caracteres`
    );

  return rules;
};
