<template>
  <v-app v-if="isAuthFromTokenLoaded">
    <app-header />

    <v-card class="app__container">
      <v-layout class="app__container">
        <v-navigation-drawer permanent v-if="!isOutsider">
          <v-list density="compact" nav>
            <v-list-item
              v-for="(item, index) in sideNavLinksComputed"
              :key="index"
              class="side-nav__route_name"
              :prepend-icon="item.icon"
              :title="item.title"
              @click="() => navigate(item.route_name)"
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

  <loading
    v-model:active="isLoadingSpinnerActive"
    :is-full-page="true"
    transition="fade"
  />

  <error-success-message></error-success-message>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppHeader from './components/shared/Header/header.vue';
import AppFooter from './components/shared/Footer/footer.vue';
import { useUser } from './composables/user';
import { watch } from 'vue';
import { getAuth } from './authorizations/authorizations';
import { useLoadingSpinner } from './composables/loadingSpinner';
import Loading from 'vue-loading-overlay';
import ErrorSuccessMessage from '@/components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    RouterView,
  },
});
</script>

<script lang="ts" setup>
import router from '@/router';

const {
  isAuthFromTokenLoaded,
  user,
  isOutsider,
  authenticateUserFromToken,
  isUserAuthenticated,
  setIsOutsider,
} = useUser();
const { isLoadingSpinnerActive } = useLoadingSpinner();
const route = useRoute();

const sideNavLinks = [
  {
    title: 'Página inicial',
    route_name: 'home',
    icon: 'mdi-home',
    roles: getAuth('home'),
  },
  {
    title: 'Utilizadores',
    route_name: 'users',
    icon: 'mdi-account-multiple',
    roles: getAuth('users'),
  },
  {
    title: 'Funerárias',
    route_name: 'groups',
    icon: 'mdi-home-modern',
    roles: getAuth('groups'),
  },
  {
    title: 'Templates',
    route_name: 'templates',
    icon: 'mdi-file-multiple',
    roles: getAuth('templates'),
  },
  {
    title: 'Declarações',
    route_name: 'records',
    icon: 'mdi-file-document',
    roles: getAuth('records'),
  },
  {
    title: 'Estatisticas',
    route_name: 'stats',
    icon: 'mdi-chart-line',
    roles: getAuth('stats'),
  },
  {
    title: 'Sobre',
    route_name: 'about',
    icon: 'mdi-information-variant',
    roles: getAuth('about'),
  },
];

const sideNavLinksComputed = ref([]);

const navigate = (route_name: string) => {
  router.push({ name: route_name });
};

async function processSideMenu() {
  await authenticateUserFromToken().then(async (result) => {
    sideNavLinksComputed.value = [];
    for (const i of sideNavLinks) {
      if (i.roles.length == 0 || i.roles.includes(user.role)) {
        sideNavLinksComputed.value.push(i);
      }
    }
  });
}

watch(user, async () => {
  await processSideMenu();
});

watch(route, () => {
  if (!isOutsider.value) return;

  setIsOutsider(route.name === 'funeraria' && !isUserAuthenticated());
});

onBeforeMount(async () => {
  await processSideMenu();
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
