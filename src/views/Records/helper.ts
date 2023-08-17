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
          return record;
        });
        // templateData = resp.data.map((template: any) => {
        //   return {
        //     id: template.id,
        //     title: template.title,
        //     group_id: getLabel('group_id', 'select', template.group_id, fields),
        //     send_type: getLabel(
        //       'send_type',
        //       'select',
        //       template.send_type,
        //       fields
        //     ),
        //   };
        // });
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
  id: string | number,
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
