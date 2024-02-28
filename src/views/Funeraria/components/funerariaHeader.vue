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
  }

  &__name {
    position: absolute;
    font-size: 3vw;
    font-weight: bold;
    top: 6vw;
    left: 12vw;

    &::after {
      content: '';
      padding-bottom: 0.8vw;
      border-bottom: 0.2vw solid red;
      width: 20vw;
      display: block;
    }
  }

  &__sub-title {
    position: absolute;
    margin-right: 12vw;
    font-size: 1vw !important;
    top: 12.3vw;
    left: 12vw;
  }
}

@media screen and (max-width: 600px) {
  .funeraria-header {
    &__image {
      max-height: 40vw;
    }

    &__name {
      font-size: 4vw !important;
      line-height: 1rem !important;
      top: 4vw;

      &::after {
        content: '';
        padding-bottom: 1rem;
        border-bottom: 0.3vw solid red;
        width: 30vw;
        display: block;
      }
    }

    &__sub-title {
      font-size: 2vw !important;
      top: 12vw;

      line-height: 1rem !important;
    }
  }
}
</style>
