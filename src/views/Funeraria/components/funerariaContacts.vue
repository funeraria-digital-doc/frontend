<template>
  <div class="funeraria-contacts">
    <img
      class="funeraria-contacts__image"
      src="@/assets/photos/funeraria_contact.jpeg"
      alt="Foto contactos"
    />

    <div class="funeraria-contacts__container">
      <div class="funeraria-contacts__card">
        <div class="funeraria-contacts__form">
          <funeraria-contacts-form />
        </div>
        <div class="funeraria-contacts__info">
          <h4 class="funeraria-contacts__upper-title text-h4">Para mais informações</h4>
          <h4 class="funeraria-contacts__title text-h4">Contacte-nos!</h4>

          <p class="funeraria-contacts__sub-title font-weight-light">
            Bem-vindo à nossa secção de contactos! <br />
            Aqui, proporcionamos uma forma fácil e rápida para entrar em
            contacto connosco. Se tiver alguma dúvida, sugestão ou apenas quiser
            partilhar a sua opinião, estamos aqui para ouvir. Preencha o
            formulário de contacto abaixo, envie-nos um email ou ligue para os
            números fornecidos. Se preferir, pode visitar-nos pessoalmente no
            nosso endereço físico. Estamos também presentes nas redes sociais,
            por isso, não hesite em conectar-se connosco. A sua opinião é
            valiosa para nós, e estamos ansiosos para ouvir de si!
          </p>

          <p class="funeraria-contacts__contact text-body-1">
            {{ contacts.email.join(',') }}
          </p>
          <p class="funeraria-contacts__contact text-body-1">
            {{ contacts.phoneNumbers.join(', ') }}
          </p>
          <p class="funeraria-contacts__contact text-body-1">
            {{ contacts.fixPhoneNumbers.join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunerariaContacts } from '@/models/funeraria.model';
import { defineProps, type PropType } from 'vue';
import FunerariaContactsForm from './funerariaContactsForm.vue';

defineProps({
  contacts: {
    type: Object as PropType<FunerariaContacts>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.funeraria-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image {
    max-height: 25rem;
    width: 121%;
    object-fit: cover;
    opacity: 0.4;
  }

  &__container {
    padding-inline: 12vw;
    width: 100%;
    top: -13rem;
  }

  &__card {
    display: flex;
    flex-direction: row;
    gap: 2vw;
    padding: 2vw 1vw;

    background-color: rgb(249, 249, 249);
    color: rgb(26, 25, 25);
    box-shadow: rgba(245, 245, 245, 0.2) 0px 4px 12px;
  }

  &__form {
    width: 50%;
  }

  // info section
  &__info {
    width: 50%;
  }

  &__upper-title {
    font-weight: bold;
  }

  &__title {
    margin-bottom: 1.5rem;
    font-weight: bold;

    &::after {
      content: '';
      padding-bottom: 0.5rem;
      border-bottom: 0.2rem solid red;
      width: 15rem;
      display: block;
    }
  }

  &__sub-title {
    margin-bottom: 2rem;
  }

  &__contact {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}

@media screen and (max-width: 1024px) {
  .funeraria-contacts {
    &__card {
      flex-direction: column-reverse;
      width: 100%;
      padding: 5vw;
    }

    &__form {
      width: 100%;
    }

    &__info {
      width: 100%;
    }
  }
}
</style>
