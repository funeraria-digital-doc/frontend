<template>
  <v-app v-if="isAuthFromTokenLoaded">
    <app-header />

    <v-card class="app__container">
      <v-layout class="app__container">
        <v-navigation-drawer permanent>
          <v-list density="compact" nav>
            <v-list-item
              v-for="(item, index) in sideNavLinksComputed"
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
import { defineComponent, onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from './components/shared/Header/header.vue';
import AppFooter from './components/shared/Footer/footer.vue';
import { useUser } from './composables/user';
import { NO_AUTH, STAFF, SUPER, USER } from './utils/constants';

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

const { isAuthFromTokenLoaded, authenticateUserFromToken, user } = useUser();

const sideNavLinks = [
  { title: 'Página inicial', link: '/', icon: 'mdi-home', role: NO_AUTH },
  {
    title: 'Utilizadores',
    link: '/users',
    icon: 'mdi-account-multiple',
    role: STAFF,
  },
  {
    title: 'Funerárias',
    link: '/groups',
    icon: 'mdi-home-modern',
    role: SUPER,
  },
  {
    title: 'Templates',
    link: '/templates',
    icon: 'mdi-file-multiple',
    role: SUPER,
  },
  {
    title: 'Declarações',
    link: '/records',
    icon: 'mdi-file-document',
    role: USER,
  },
  {
    title: 'Estatisticas',
    link: '/stats',
    icon: 'mdi-chart-line',
    role: STAFF,
  },
  {
    title: 'Sobre',
    link: '/about',
    icon: 'mdi-information-variant',
    role: NO_AUTH,
  },
];

const sideNavLinksComputed = ref([]);

const navigate = (link: string) => {
  router.push(link);
};

onBeforeMount(async () => {
  await authenticateUserFromToken().then(async (result) => {
    if (result) {
      for (const i of sideNavLinks) {
        if (user.role >= i.role) {
          sideNavLinksComputed.value.push(i);
        }
      }
    }
  });
});
</script>

<style scoped lang="scss">
.app {
  &__container {
    height: 100%;
  }

  &__page {
    width: fit-content;
    margin: 2rem 10rem;
  }
}
</style>
