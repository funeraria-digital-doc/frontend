import { groupsList } from "@/api/groups";

export const headers = [
  { title: 'Nome', align: 'start', key: 'name', sortable: true },
  { title: 'Telefone', align: 'end', key: 'family_member_phone', sortable: true },
  { title: 'Email', align: 'end', key: 'family_member_email', sortable: true },
  { title: 'Género', align: 'end', key: 'gender', sortable: true },
  { title: 'Funerária', align: 'end', key: 'group_id', sortable: true },
  { title: 'Estado', align: 'end', key: 'status', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false },
];
export const fields = [
  {
    name: 'name',
    type: 'text-field',
  },
  {
    name: 'group_id',
    type: 'select',
    items: await getGroups(),
  },
  {
    name: 'send_type',
    type: 'select',
    items: [
      { label: 'Nenhum', value: 'NONE' },
      { label: 'Documento', value: 'DOCUMENT' },
      { label: 'Email', value: 'EMAIL' },
      { label: 'Documento e Email', value: 'DOCUMENT_EMAIL' },
    ],
  },
];

async function getGroups() {
  const resp = await groupsList();
  if (resp.data) {
    return resp.data.map((group: any) => {
      return { label: group.name, value: group.id };
    });
  } else {
    return [];
  }
}
