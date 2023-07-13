<template>
  <page title="Contatos">
    <div class="contacts">
      <div class="contacts__element">
        <v-btn
          class="contacts__linkedin"
          color="blue"
          icon="mdi-linkedin"
          @click="
            redirectLinkedin(
              'https://www.linkedin.com/in/rafael-lopes-79851a150/'
            )
          "
        />

        <p>Rafael Lopes</p>
      </div>

      <div class="contacts__element">
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

        <p>João Alves</p>
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from '../../components/shared/Page/page.vue';

const redirectLinkedin = (url: string) => window.open(url);
</script>

<style lang="scss">
.contacts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__element {
    display: flex;
    align-items: center;
    gap: 1rem;

    > p {
      font-size: 1.2rem;
    }
  }

  &__linkedin {
    cursor: pointer;
  }
}
</style>
