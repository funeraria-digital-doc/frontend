<template class="contacts">
  <page title="Contatos">
    <p>Rafael Lopes</p>

    <v-btn
      class="contacts__linkedin"
      color="blue"
      icon="mdi-linkedin"
      @click="redirectLinkedin()"
    />

    <p>João Alves</p>

    <v-btn
      class="contacts__linkedin"
      color="blue"
      icon="mdi-linkedin"
      @click="redirectLinkedin()"
    />
  </page>
</template>

<script setup lang="ts">
import Page from "../../components/shared/Page/page.vue";

const redirectLinkedin = () =>
  window.open("https://www.linkedin.com/in/rafael-lopes-79851a150/");

const redirectGithub = () => window.open("https://github.com/rafael8lopes/");
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
