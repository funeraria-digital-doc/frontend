import {
  groupsList,
  groupCreate,
  groupEdit,
  groupDelete,
  groupGet,
} from '@/api/groups';
import { useSnackBar } from '@/composables/snackBar';

const { showSnackbar } = useSnackBar();

const mock = {
  id: 4,
  name: 'Funerária XPTO',
  created_by_id: 1,
  updated_by_id: 1,
  image: '',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec
        ipsum ultrices, aliquam augue sit amet, luctus arcu. Mauris non
        consectetur risus. Maecenas fermentum leo in porttitor euismod. Vivamus
        nec lorem tellus. Nulla sed rutrum ex, sit amet rutrum sapien. Mauris
        velit sapien, rutrum eget neque eu, lacinia volutpat felis. Cras vel
        nunc et nibh convallis semper vitae a eros. Quisque mollis ante vel
        risus auctor pulvinar. Duis laoreet viverra malesuada. Duis mollis nunc
        at posuere vehicula. Integer ut finibus nisi. Vestibulum bibendum neque
        nec dui pellentesque volutpat. Morbi ut ante in urna placerat tempor.
        Sed blandit, arcu in mattis eleifend, nunc ex blandit turpis, vel
        venenatis sapien nisl id elit. Ut sapien sapien, molestie vel metus nec,
        tempus tempor est. Integer rhoncus tortor eget facilisis finibus.`,
  services: [
    {
      title: 'Consultar Óbitos Recentes',
      description:
        'Procura informações sobre a despedida de alguém próximo? Aqui encontra as cerimónias realizadas nas últimas semanas e as que se irão efectuar nos próximos dias.',
    },
    {
      title: 'Enviar Flores e Condolências',
      description: `Expresse o seu apoio e homenagem a quem parte, comprando e enviando flores ou deixando as suas mensagens de condolências.                    
Pode fazê-lo já aqui.`,
    },
    {
      title: 'Cerimónia com Cremação',
      description: `É cada vez mais comum as famílias optarem por um funeral com cremação. Conheça todos os detalhes e decida se esta é a despedida certa para o seu ente querido.`,
    },
  ],
  locations: [
    {
      email: ['email_1@teste.pt'],
      phoneNumbers: ['111111111', '111111112'],
      address: 'Street Test 1, 1234, 1234-123, City, Country',
      coords: [39.60368701414749, -8.41733119612382],
    },
    {
      email: ['email_2@teste.pt'],
      phoneNumbers: ['222222222', '222222223'],
      address: 'Street Test 2, 1234, 1234-123, City, Country',
      coords: [38.77659617619304, -9.134987033367352],
    },
    {
      email: ['email_3@teste.pt'],
      phoneNumbers: ['333333333', '333333334'],
      address: 'Street Test 2, 1234, 1234-123, City, Country',
      coords: [39.461590444057634, -8.473793499839573],
    },
  ],
};

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
