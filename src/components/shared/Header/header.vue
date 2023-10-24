<template>
  <div>
    <v-toolbar prominent :elevation="8">
      <v-toolbar-title @click="handleHome" id="app-name">
        <!-- <img src="./img_3.png" alt="logo" style="width:65px"/> -->
        <img src="./img_6.png" alt="logo" style="width: 80px" />
        <p>Funerária Digital Doc</p>
        <!-- <img src="./img_9.png" alt="logo" style="width:50px"/> -->
      </v-toolbar-title>

      <v-btn v-if="!isUserAuthenticated()" @click="onOpenLogin">
        Entrar &nbsp;
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-menu v-if="isUserAuthenticated()" open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props"> {{ user.name }} </v-btn>
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
    </v-toolbar>

    <v-dialog
      v-model="isLoginModalOpen"
      width="auto"
      transition="dialog-top-transition"
    >
      <login-modal @close-modal="onCloseLogin" />
    </v-dialog>
  </div>
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
#app-name {
  cursor: pointer;
}

.v-toolbar-title__placeholder {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
