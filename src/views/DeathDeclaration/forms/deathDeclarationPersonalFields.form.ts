import type { DynamicField } from "@/models/dynamicField.model";

const rules = [(v: string) => !!v || "Campo obrigatório"];

export const DeathDeclarationPersonalFields: DynamicField[] = [
  {
    label: "Nome",
    name: "name",
    input: "text",
    rules,
  },
  {
    label: "Are you human?",
    name: "human",
    input: "checkbox",
    value: true,
  },
  {
    label: "State",
    name: "state",
    input: "select",
    items: [
      { label: "Colorado", value: "cl" },
      { label: "New York", value: "ny" },
    ],
    rules,
  },
  //   {
  //     label: "Foto",
  //     name: "photo",
  //     input: "file",
  //     rules,
  //   },
  // {
  //   label: "Nome",
  //   name: "name",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Sexo",
  //   name: "gender",
  //   input: "select",
  //   items: [
  //     { label: "Masculino", value: "MALE" },
  //     { label: "Feminino", value: "WOMAN" },
  //     { label: "Outro", value: "OTHER" },
  //   ],
  //   rules,
  // },
  // {
  //   label: "Estado civil",
  //   name: "marital_status",
  //   input: "select",
  //   items: [
  //     { label: "Solteiro", value: "SINGLE" },
  //     { label: "Casado", value: "MARIED" },
  //     { label: "Divorciado", value: "DIVORCED" },
  //     { label: "Viúvo", value: "WIDOWER" },
  //   ],
  //   rules,
  // },
  // {
  //   label: "Cartão de cidadão",
  //   name: "cc",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Número de identificação fiscal",
  //   name: "nif",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Número de identificação de segurança social",
  //   name: "niss",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Data de nascimento",
  //   name: "birthday",
  //   input: "date",
  //   rules,
  // },
  // {
  //   label: "Idade",
  //   name: "age",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Morada",
  //   name: "address",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Freguesia",
  //   name: "parish ",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Município",
  //   name: "municipality",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Nome da mãe",
  //   name: "mother_name",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Nome do pai",
  //   name: "father_name",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Data de casamento",
  //   name: "last_mariage_date",
  //   input: "date",
  //   rules,
  // },
  // {
  //   label: "Nome do cônjuge",
  //   name: "spouse_name",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Sexo do cônjuge",
  //   name: "spouse_gender",
  //   input: "select",
  //   items: [
  //     { label: "Masculino", value: "MALE" },
  //     { label: "Feminino", value: "WOMAN" },
  //     { label: "Outro", value: "OTHER" },
  //   ],
  //   rules,
  // },
  // {
  //   label: "Idade do cônjuge",
  //   name: "spouse_gender",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "Natural da freguesia",
  //   name: "naturality_parish",
  //   input: "text",
  //   rules,
  // },
  // {
  //   label: "----",
  //   name: "Natural do Município",
  //   input: "text",
  //   rules,
  // },
];
