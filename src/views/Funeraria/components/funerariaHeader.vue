<template>
  <div class="funeraria-header">
    <img
      class="funeraria-header__image"
      src="@/assets/photos/funeraria_header.jpeg"
      alt="Foto cabeçalho"
    />

    <h2 class="funeraria-header__name">
      {{ name }}
    </h2>
    <p class="funeraria-header__sub-title text-subtitle-1 font-weight-light">
      {{ subTitle }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FunerariaHeader',
  props: {
    name: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.funeraria-header {
  &__image {
    margin: 0 -5vw;
    max-height: 30vw;
    width: 121%;
    object-fit: cover;
    opacity: 0.4;
    object-position: 50% 45%;
  }

  &__name {
    position: absolute;
    top: 5vw;
    left: 12vw;
    font-size: 3.5rem;
    font-weight: bold;
    line-height: 3rem;
    margin-right: 1.5rem;

    &::after {
      content: '';
      padding-bottom: 1rem;
      border-bottom: 0.3rem solid red;
      width: 20rem;
      display: block;
    }
  }

  &__sub-title {
    position: absolute;
    top: 10vw;
    left: 12vw;
    margin-right: 12vw;
  }
}

@media screen and (max-width: 1024px) {
  .funeraria-header {
    &__image {
      max-height: 40vw;
      object-position: 50% 30%;
    }

    &__name {
      line-height: 3.5rem;
      top: 4rem;
    }

    &__sub-title {
      top: 13.5rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .funeraria-header {
    &__image {
      max-height: 60vw;
      object-position: 50% 0%;
    }

    &__name {
      font-size: 2rem !important;
      line-height: 2rem !important;
      top: 2rem;

      &::after {
        content: '';
        padding-bottom: 0.3rem;
        border-bottom: 0.2rem solid red;
        width: 40vw;
        display: block;
      }
    }

    &__sub-title {
      font-size: 0.9rem !important;
      line-height: 1rem !important;
      top: 7.5rem;
    }
  }
}
</style>
