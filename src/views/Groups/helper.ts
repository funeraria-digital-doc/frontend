import { groupsList, groupCreate } from '@/api/groups';
import { getLocalStorage } from '@/utils/localStorage';
import { TOKEN_KEY } from '@/utils/constants';

export const getGroups = async (loading, groups) => {
  const token = getLocalStorage(TOKEN_KEY);
  if (token) {
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
        console.log('erro', resp);
      }
      loading.value = false;
    });
  } else {
    console.log('no token');
  }
};

export const createGroup = async (
  loading,
  groups,
  newGroup,
  datatableComponent
) => {
  const token = getLocalStorage(TOKEN_KEY);
  if (token) {
    groupCreate(newGroup).then((resp) => {
      if (resp.success) {
        const newGroups = groups.value;
        newGroups.push(resp.data.group);
        groups.value = newGroups;
        datatableComponent.value.closeDialog();
        datatableComponent.value.errorSuccessMessage({
          hasData: true,
          hasMessage: true,
          message: 'Funerária criada com sucesso!',
          isSuccess: true,
        });
      } else {
        datatableComponent.value.errorSuccessMessage({
          hasData: true,
          hasMessage: false,
          message: 'Erro ao criar Funerária!',
          isSuccess: false,
        });
      }
      loading.value = false;
    });
  } else {
    datatableComponent.value.errorSuccessMessage({
      hasData: true,
      hasMessage: false,
      message: 'Não está Autenticado',
      isSuccess: false,
    });
    loading.value = false;
  }
  
};
