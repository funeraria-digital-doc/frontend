import {
  groupsList,
  groupCreate,
  groupEdit,
  groupDelete,
  groupGet,
} from '@/api/groups';
import { useSnackBar } from '@/composables/snackBar';

const { showSnackbar } = useSnackBar();

// TODO: remove mock
const mock = {
  id: 4,
  name: 'A Nova Agência Funerária de Tomar',
  created_by_id: 1,
  updated_by_id: 1,
  image:
    'https://app-funeralonline.s3.amazonaws.com/media/entity/A_Nova_Ag%C3%AAncia_Funer%C3%A1ria_De_Tomar.jpg',
  subTitle:
    'Pretendemos apoiá-lo a dignificar e homenagear o seu ente querido, de forma  única, célere e profissional',
  description: `Em tempos de luto, prometemos cuidar de todas as suas necessidades. Prometemos fornecer-lhe serviço profissional e aconselhamento nas horas difíceis.
Prestamos uma série de serviços que esperamos poder ajudá-lo quando mais necessita. O nosso serviço de repatriamento garante que o defunto regressa ao país de origem para o seu funeral, caso seja esse o seu desejo.

Temos ligações com consulados, médicos legistas, alta comissariado, linhas aéreas ou marítimas e autoridades legais.

Prestamos serviço e aconselhamento de cremação.

Também fornecemos embalsamento e arte restauradora, cujo objectivo é garantir que o corpo resiste à deterioração.

Também podemos facilitar serviços de exumação. Os nossos serviços incluem uma casa mortuária moderna, veículos bem equipados e uma sala de embalsamento. Prometemos aliviar-lhe o stress e pressão da situação nesta ocasião difícil.

Ligue-nos a qualquer hora para solicitar um serviço profissional!`,
  serviceDescription: `A nossa agência funerária oferece uma variedade de serviços.`,
  services: [
    {
      title: 'Transporte',
      image:
        'https://funerariasantacasa24h.com.br/wp-content/uploads/2019/04/2019-04-extra-transporte-de-corpo.jpg',
    },
    {
      title: 'Flores Naturais',
      image:
        'https://www.interflora.pt/blog/wp-content/uploads/florista-ramo-1024x640.jpg',
    },
    {
      title: 'Flores Artificiais',
      image: 'https://img.fruugo.com/product/0/83/1004975830_max.jpg',
    },
    {
      title: 'Velas',
      image:
        'https://www.raquelsilva.pt/wp-content/uploads/2020/07/15_6_led_candles.jpg',
    },
  ],
  contacts: {
    email: ['anovaagenciafunerariadetomar@hotmail.com'],
    phoneNumbers: ['917 599 010', '919 924 048', '913 749 663', '918 741 923 '],
    fixPhoneNumbers: ['249311012'],
  },
  locations: [
    {
      town: 'Tomar',
      address: 'Avenida Doutor Cândido Madureira, número 100, 2300-531',
      coords: [39.60216616485415, -8.413803258940865],
    },
    {
      town: 'Torres Novas',
      address: 'Castelo de Torres Novas, 2350-758',
      coords: [39.479529855618146, -8.540568949235606],
    },
  ],
  deaths: [
    {
      image:
        'https://site.funerariadigitaldoc.pt/wp-content/uploads/2024/02/pexels-ksenia-chernaya-8986691-scaled.jpg',
      name: 'Maria Antunes',
      date: 'Tomar 24/02/2024',
    },
    {
      image:
        'https://site.funerariadigitaldoc.pt/wp-content/uploads/2024/02/pexels-ksenia-chernaya-8986691-scaled.jpg',
      name: 'Fernando Gomes',
      date: 'Tomar 18/02/2024',
    },
    {
      image:
        'https://site.funerariadigitaldoc.pt/wp-content/uploads/2024/02/pexels-ksenia-chernaya-8986691-scaled.jpg',
      name: 'Camila Sousa',
      date: 'Tomar 22/01/2024',
    },
    {
      image:
        'https://site.funerariadigitaldoc.pt/wp-content/uploads/2024/02/pexels-ksenia-chernaya-8986691-scaled.jpg',
      name: 'Lucas Silva',
      date: 'Tomar 15/01/2024',
    },
  ],
  qas: [
    {
      question:
        'Como posso organizar um serviço funerário para um ente querido?',
      answer:
        'Para organizar um serviço funerário, entre em contacto conosco através do nosso número de telefone disponível na secção de contactos do nosso website. Estaremos prontos para orientá-lo em cada passo do processo, desde a escolha do caixão até a coordenação da cerimónia.',
    },
    {
      question:
        'Quais são as opções disponíveis para o local de descanso final?',
      answer:
        'Oferecemos diversas opções para o local de descanso final, incluindo sepulturas em cemitérios locais, cremação com urnas personalizadas e mausoléus. Podemos discutir as preferências da sua família e ajudá-lo a tomar decisões que melhor atendam às suas necessidades e tradições.',
    },
    {
      question: 'Vocês fornecem serviços de pré-planeamento funerário?',
      answer:
        'Sim, oferecemos serviços de pré-planeamento funerário para aqueles que desejam aliviar o fardo emocional e financeiro para os seus entes queridos. Entre em contacto conosco para discutir as opções disponíveis e personalizar um plano que atenda aos seus desejos e necessidades específicos.',
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
    return mock;
    // remove return
    // this endpoint needs to be open for everyone
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
