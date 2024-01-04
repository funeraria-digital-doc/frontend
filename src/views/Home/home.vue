<template>
  <page :title="title">
    <div class="home__content">
      <img src="@/assets/logo.png" alt="logo" class="home__image" />
      <p>
        Plataforma para agilizar e gerir documentos referentes ao processo de
        declaração de um falecimento.
      </p>

      <home-stats v-if="hasStats"></home-stats>
    </div>

    <div v-if="!isLoggedIn" class="home__login">
      <login />
    </div>
  </page>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Home',
  components: {
    Login,
  },
});
</script>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useUser } from '@/composables/user';
import Page from '../../components/shared/Page/page.vue';
import HomeStats from './components/homeStats.vue';
import Login from '../../components/shared/Login/login.vue';
import { watch } from 'vue';
import { checkAuth } from '@/authorizations/authorizations';
import { AUTH_PERMISSIONS } from '@/authorizations/constants';

const { isUserAuthenticated, user } = useUser();
const title = ref('');
const isLoggedIn = ref(false);
const hasStats = ref(false);

const getTitle = () => {
  if (!isLoggedIn.value) {
    title.value = 'Login';
  } else {
    title.value = 'Página inicial';
  }
};

watch(user, () => {
  isLoggedIn.value = isUserAuthenticated();
});

watch(isLoggedIn, async () => {
  getTitle();

  hasStats.value = await checkAuth(AUTH_PERMISSIONS.STAFF);
});

onBeforeMount(async () => {
  isLoggedIn.value = isUserAuthenticated();
  getTitle();

  hasStats.value = await checkAuth(AUTH_PERMISSIONS.STAFF);
});
</script>

<style scoped lang="scss">
.home {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }

  &__image {
    width: 30%;
  }

  &__login {
    width: 30%;
    margin: auto
  }
}
.spacer-2 {
  height: 2rem;
}
</style>
