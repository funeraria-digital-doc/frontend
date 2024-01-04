<template>
  <v-toolbar prominent :elevation="8" id="toolbar">
    <div id="toolbar__title" @click="handleHome">
      <img src="@/assets/logo.png" alt="logo" style="width: 80px" />
      <h6 class="text-h6">Funerária Digital Doc</h6>
    </div>

    <div id="toolbar__user-actions">
      <v-btn v-if="!isUserAuthenticated()" @click="onOpenLogin">
        Entrar &nbsp;
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-menu v-if="isUserAuthenticated()">
        <template v-slot:activator="{ props }">
          <div class="user">
            <v-btn v-bind="props"> {{ user.name }} </v-btn>

            <img
              v-if="user.imageBase64"
              :src="user.imageBase64"
              class="user__profile-img"
              :onclick="handleProfile"
            />
          </div>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in accountLinks"
            :key="index"
            @click="item.action"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>

  <v-dialog
    v-model="isLoginModalOpen"
    width="auto"
    transition="dialog-top-transition"
  >
    <login-modal @close-modal="onCloseLogin" />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginModal from '../../LoginModal/loginModal.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    LoginModal,
  },
});
</script>

<script setup lang="ts">
import router from '@/router';
import { useUser } from '../../../composables/user';

const { user, isUserAuthenticated, logoutUser } = useUser();

let isLoginModalOpen = ref(false);

const onOpenLogin = () => {
  isLoginModalOpen.value = true;
};

const onCloseLogin = () => {
  isLoginModalOpen.value = false;
};

const handleHome = () => {
  router.push('/');
};

const handleProfile = () => {
  router.push({ name: 'profile' });
};

const accountLinks = [
  { title: 'Perfil', action: handleProfile },
  { title: 'Encerrar', action: logoutUser },
];
</script>

<style lang="scss">
#toolbar {
  display: flex;
  justify-content: space-between;
  padding-inline: 1rem;
  color: white;

  &__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  &__user-actions {
    margin-left: auto;
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &__profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
