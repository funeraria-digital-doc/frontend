import { recordDelete, recordItem, recordsList } from '@/api/records';

export const getRecords = async (
  loading: { value: boolean },
  records: { value: any },
  fields: any
) => {
  recordsList().then((resp) => {
    if (resp.success) {
      let recordsData = [];
      if (resp.data.length > 0) {
        recordsData = resp.data.map((record: any) => {
          return {
            id: record.id,
            name: record.name,
            family_member_phone: record.family_member_phone,
            gender: getLabel('gender', 'select', record.gender, fields),
            status: getLabel('status', 'select', record.status, fields),
            group_id: getLabel('group_id', 'select', record.group_id, fields),
            email: record.email,
          }
        });
      }
      records.value = recordsData;
    } else {
      console.error('erro', resp);
    }
    loading.value = false;
  });
};

export const getSingleRecord = async (id: string) => {
  return recordItem(id).then((resp: any) => {
    if (resp.success) {
      console.log('send_type', resp.data);
      if (resp.data.id) {
        console.log('send_type', resp.data);
        return resp.data;
      }
    } else {
      console.error('Get template error:', resp);
    }
  });
};

export const deleteRecord = async (
  id: string,
  records: { value: { [x: string]: any } },
  snack: any
) => {
  try {
    recordDelete(id).then((resp: any) => {
      if (resp.success) {
        records.value = records.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        snack.value.showSnackbar('Declaração eliminada com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro ao eliminar a declaração. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    snack.value.showSnackbar(
      'Ocorreu um erro ao criar a declaração. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export function getLabel(key: string, type: string, value: any, fields: any) {
  const field = fields.find((f: { name: string }) => f.name === key);
  let label = null;
  if (type == 'checkbox') {
    if (value) {
      label = field.true_value_label;
    } else {
      label = field.false_value_label;
    }
  } else if (type == 'select') {
    const val = field.items.find((i: { value: any }) => i.value === value);
    if (val && val['label']) {
      label = val['label'];
    }
  }
  return label;
}
