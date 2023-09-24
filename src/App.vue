<template>
  <v-app v-if="isAuthFromTokenLoaded">
    <app-header />

    <v-card class="app__container">
      <v-layout class="app__container">
        <v-navigation-drawer permanent>
          <v-list density="compact" nav>
            <v-list-item
              v-for="(item, index) in sideNavLinks"
              :key="index"
              class="side-nav__link"
              :prepend-icon="item.icon"
              :title="item.title"
              @click="() => navigate(item.link)"
            />
          </v-list>
        </v-navigation-drawer>

        <v-main class="app__page">
          <div>
            <RouterView />
          </div>
        </v-main>
      </v-layout>
    </v-card>

    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from './components/shared/Header/header.vue';
import AppFooter from './components/shared/Footer/footer.vue';
import { useUser } from './composables/user';

export default defineComponent({
  name: 'LoginModal',
  components: {
    AppHeader,
    AppFooter,
    RouterView,
  },
});
</script>

<script lang="ts" setup>
import router from '@/router';

const { isAuthFromTokenLoaded, authenticateUserFromToken } = useUser();

const sideNavLinks = [
  { title: 'Página inicial', link: '/', icon: 'mdi-home' },
  { title: 'Contatos', link: '/contacts', icon: 'mdi-phone' },
  { title: 'Utilizadores', link: '/users', icon: 'mdi-account-multiple' },
  { title: 'Funerárias', link: '/groups', icon: 'mdi-home-modern' },
  { title: 'Templates', link: '/templates', icon: 'mdi-file-multiple' },
  { title: 'Declarações', link: '/records', icon: 'mdi-file-document' },
  { title: 'Estatisticas', link: '/stats', icon: 'mdi-information-variant' },
];

const navigate = (link: string) => {
  router.push(link);
};

onBeforeMount(() => {
  authenticateUserFromToken();
});
</script>

<style scoped lang="scss">
.app {
  &__container {
    height: 100%;
  }

  &__page {
    margin: 2rem 10rem;
  }
}
</style>
