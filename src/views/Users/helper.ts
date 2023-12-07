import { listAllUsers, userCreate, userDelete, userEdit } from '@/api/users';
import { useSnackBar } from '@/composables/snackBar';
import { useUser } from '@/composables/user';
import { getLabel } from '@/utils/datatableHelper';

const { showSnackbar } = useSnackBar();

export const getUsers = async (
  loading: { value: boolean },
  users: { value: any },
  fields: any
) => {
  listAllUsers().then((resp) => {
    if (resp.success) {
      const usersData = resp.data.users.map((user: any) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          group: getLabel('group', user.group, fields),
          is_staff: getLabel('is_staff', user.is_staff, fields),
          is_superuser: getLabel('is_superuser', user.is_superuser, fields),
          status: getLabel('status', user.status, fields),
        };
      });
      users.value = usersData;
    } else {
      console.error('erro', resp);
    }
    loading.value = false;
  });
};
export const createUser = async (newUser: any, users: any, fields: any) => {
  const newUserSubmit = {
    username: newUser.username,
    email: newUser.email,
    status: newUser.status != '' ? newUser.status : null,
    is_staff: newUser.is_staff != '' ? newUser.is_staff : false,
    is_superuser: newUser.is_superuser != '' ? newUser.is_superuser : false,
    group_user: newUser.group != '' && newUser.group ? newUser.group : null,
  };
  try {
    userCreate(newUserSubmit).then((resp) => {
      if (resp.success) {
        const user = {
          id: resp.data.id,
          username: resp.data.username,
          email: resp.data.email,
          group: getLabel('group', resp.data.group, fields),
          is_staff: getLabel('is_staff', resp.data.is_staff, fields),
          is_superuser: getLabel(
            'is_superuser',
            resp.data.is_superuser,
            fields
          ),
          status: getLabel('status', resp.data.status, fields),
        };
        users.value.push(user);
        showSnackbar('Funerária criada com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao criar a funerária. <br>Por favor, tente novamente mais tarde.',
          resp.error && resp.error.data ? JSON.stringify(resp.error.data) : '',
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

export const editUser = async (
  editedUser: any,
  index: string | number,
  users: { value: { [x: string]: any } },
  fields: any
) => {
  try {
    const newUserSubmit = {
      id: editedUser.id,
      username: editedUser.username,
      email: editedUser.email,
      status: editedUser.status != '' ? editedUser.status : null,
      is_staff: editedUser.is_staff != '' ? editedUser.is_staff : false,
      is_superuser:
        editedUser.is_superuser != '' ? editedUser.is_superuser : false,
      group_user:
        editedUser.group != '' && editedUser.group ? editedUser.group : null,
    };
    userEdit(newUserSubmit).then((resp) => {
      if (resp.success) {
        const user = {
          id: resp.data.id,
          username: resp.data.username,
          email: resp.data.email,
          group: getLabel('group', resp.data.group, fields),
          is_staff: getLabel('is_staff', resp.data.is_staff, fields),
          is_superuser: getLabel(
            'is_superuser',
            resp.data.is_superuser,
            fields
          ),
          status: getLabel('status', resp.data.status, fields),
        };
        users.value[index] = user;
        showSnackbar('Funerária editada com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao editar a funerária. <br>Por favor, tente novamente mais tarde.',
          resp.error && resp.error.data ? JSON.stringify(resp.error.data) : '',
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

export const deleteUser = async (
  id: string | number,
  users: { value: { [x: string]: any } }
) => {
  try {
    userDelete(id).then((resp) => {
      if (resp.success) {
        users.value = users.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        showSnackbar('Funerária eliminada com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao eliminar a funerária. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp),
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

export function canAction(itemRaw: {
  username: string;
  email: string;
  role: string;
}) {
  const { user } = useUser();
  const isSameUser =
    user.name !== itemRaw.username && user.email !== itemRaw.email;
  const isRoleLower =
    (user.role == 'staff' && itemRaw.role == 'user') ||
    (user.role == 'super' &&
      (itemRaw.role == 'staff' || itemRaw.role == 'user'));
  return isSameUser || isRoleLower;
}
