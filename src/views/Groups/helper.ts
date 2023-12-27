import { groupsList, groupCreate, groupEdit, groupDelete } from '@/api/groups';

export const getGroups = async (groups: { value: any }) => {
  groupsList().then((resp) => {
    if (resp.success) {
      const groupsData = resp.data.map((group: { id: any; name: any }) => {
        return {
          id: group.id,
          name: group.name,
        };
      });
      groups.value = groupsData;
    } else {
      console.error('erro', resp);
    }
  });
};

export const createGroup = async (newGroup: any, groups: any, snack: any) => {
  try {
    groupCreate(newGroup).then((resp) => {
      if (resp.success) {
        groups.value.push(resp.data.group);
        snack.value.showSnackbar('Funerária criada com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    snack.value.showSnackbar(
      'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export const editGroup = async (
  editedGroup: any,
  index: string | number,
  groups: { value: { [x: string]: any } },
  snack: any
) => {
  try {
    groupEdit(editedGroup).then((resp) => {
      if (resp.success) {
        groups.value[index] = resp.data;
        snack.value.showSnackbar('Funerária editada com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro ao editar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    snack.value.showSnackbar(
      'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export const deleteGroup = async (
  id: string | number,
  groups: { value: { [x: string]: any } },
  snack: any
) => {
  try {
    groupDelete(id).then((resp) => {
      if (resp.success) {
        groups.value = groups.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        snack.value.showSnackbar('Funerária eliminada com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro ao eliminar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    snack.value.showSnackbar(
      'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export function canAction() {
  return true;
}
