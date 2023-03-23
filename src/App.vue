<template>
  <v-app>
    <!-- TODO add image to header and side bar -->
    <app-header />

    <v-card class="app__container">
      <v-layout class="app__container">
        <v-navigation-drawer permanent>
          <v-list class="app__side-nav" density="compact" nav>
            <v-list-item
              v-for="(item, index) in sideNavLinks"
              :key="index"
              class="side-nav__link"
              :prepend-icon="item.icon"
              :title="item.title"
              @click="navigate(item.link)"
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
import { defineComponent } from "vue";
import router from "@/router";
import { RouterView } from "vue-router";
import AppHeader from "./components/shared/Header/header.vue";
import AppFooter from "./components/shared/Footer/footer.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    RouterView,
  },
  setup() {
    const sideNavLinks = [
      { title: "Home", link: "/", icon: "mdi-home" },
      { title: "About", link: "/about", icon: "mdi-information-variant" },
    ];

    const navigate = (link: string) => {
      router.push(link);
    };

    return { sideNavLinks, navigate };
  },
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
