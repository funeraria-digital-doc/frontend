<template class="contacts">
  <page title="Contatos">
    <p>Rafael Lopes</p>

    <v-btn
      class="contacts__linkedin"
      color="blue"
      icon="mdi-linkedin"
      @click="
        redirectLinkedin('https://www.linkedin.com/in/rafael-lopes-79851a150/')
      "
    />

    <p>João Alves</p>

    <v-btn
      class="contacts__linkedin"
      color="blue"
      icon="mdi-linkedin"
      @click="
        redirectLinkedin(
          'https://www.linkedin.com/in/jo%C3%A3o-alves-84aba4223/'
        )
      "
    />
  </page>
</template>

<script setup lang="ts">
import Page from '../../components/shared/Page/page.vue';

const redirectLinkedin = (url: string) => window.open(url);
</script>

<style lang="scss">
.contacts {
  &__title {
    margin-bottom: 1rem;
  }

  &__linkedin {
    margin-top: 2rem;
    cursor: pointer;
  }
}
</style>
