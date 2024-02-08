import {
  groupsList,
  groupCreate,
  groupEdit,
  groupDelete,
  groupGet,
} from '@/api/groups';
import { useSnackBar } from '@/composables/snackBar';

const { showSnackbar } = useSnackBar();

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

export const getGroup = async (id: string) => {
  const mock = {
    id: 4,
    name: 'Funerária XPTO',
    created_by_id: 1,
    updated_by_id: 1,
  };

  try {
    // remove return
    return groupGet(id).then((resp) => {
      if (resp.success) {
        return mock;
      } else {
        // showSnackbar(
        //   'DDOcorreu um erro ao obter os dados da funerária. <br>Por favor, tente novamente mais tarde',
        //   JSON.stringify(resp.error.error),
        //   false
        // );

        return mock;
      }
    });
  } catch (e: any) {
    showSnackbar(
      'Ocorreu um erro ao obter os dados da funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export const createGroup = async (newGroup: any, groups: any) => {
  try {
    groupCreate(newGroup).then((resp) => {
      if (resp.success) {
        groups.value.push(resp.data.group);
        showSnackbar('Funerária criada com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    showSnackbar(
      'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export const editGroup = async (
  editedGroup: any,
  index: string | number,
  groups: { value: { [x: string]: any } }
) => {
  try {
    groupEdit(editedGroup).then((resp) => {
      if (resp.success) {
        groups.value[index] = resp.data;
        showSnackbar('Funerária editada com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao editar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    showSnackbar(
      'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export const deleteGroup = async (
  id: string | number,
  groups: { value: { [x: string]: any } }
) => {
  try {
    groupDelete(id).then((resp) => {
      if (resp.success) {
        groups.value = groups.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        showSnackbar('Funerária eliminada com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao eliminar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    showSnackbar(
      'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export function canAction() {
  return true;
}
