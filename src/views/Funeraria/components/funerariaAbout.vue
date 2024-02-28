<template>
  <div class="funeraria-about__container">
    <aside class="funeraria-about__text">
      <h4 class="funeraria-about__title text-h4">Quem somos?</h4>
      <p class="funeraria-about__desc text-subtitle-1 font-weight-light">
        {{ description }}
      </p>
    </aside>
    <img class="funeraria-about__image" :src="image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FunerariaHeader',
  props: {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.funeraria-about {
  &__container {
    display: flex;
    margin: 3vw 12vw;
    gap: 10vw;
  }

  &__text {
    align-self: center;
    font-size: 1vw !important;
  }

  &__title {
    font-size: 2vw !important;
    margin-bottom: 1vw;
    font-weight: bold;
  }

  &__desc {
    font-size: 1vw !important;
  }

  &__image {
    max-width: 30rem;
    object-fit: contain;
  }
}

@media screen and (max-width: 1200px) {
  .funeraria-about {
    &__container {
      flex-direction: column;
      gap: 5vw;

      margin-bottom: 6vw;
    }

    &__title {
      font-size: 3vw !important;
    }

    &__desc {
      font-size: 2vw !important;
      line-height: 3vw !important;
    }

    &__image {
      max-width: 30vw;
      align-self: center;
    }
  }
}
</style>
