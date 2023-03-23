<template class="about">
  <page title="About">
    <p>
      Hi, I'm Rafael Lopes I live in Portugal and i'm a frontend developer
      currently working at Mercedes Benz.
    </p>
    <p>
      I have a software engineering degree and 4 years of experience, I prefer
      work with Typescript and React but i also have experience with Angular and
      VUE.
    </p>

    <p>
      I also have experience with fullstack roles where i worked with Python,
      Flask, MongoDB and Docker.
    </p>

    <p>
      Interested on learn new technologies and expertise the ones i already
      know.
    </p>

    <v-btn
      class="about__linkedin"
      color="blue"
      icon="mdi-linkedin"
      @click="redirectLinkedin"
    />

    <v-btn
      class="about__linkedin ml-5"
      color="black"
      icon="mdi-github"
      @click="redirectGithub"
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
.about {
  &__title {
    margin-bottom: 1rem;
  }

  &__linkedin {
    margin-top: 2rem;
    cursor: pointer;
  }
}
</style>
