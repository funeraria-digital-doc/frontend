<template>
  <page :title="title">
    <p v-if="isLoggedIn">
      Plataforma para agilizar e gerir os documentos referentes ao processo de
      declarar um falecimento.
    </p>
    <login v-else></login>
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
import Page from '../../components/shared/Page/page.vue';
import { useUser } from '@/composables/user';
import Login from '../../components/shared/Login/login.vue';
import { watch } from 'vue';

const { isUserAuthenticated, user } = useUser();
const title = ref('');
const isLoggedIn = ref(false);

watch(user, () => {
  isLoggedIn.value = isUserAuthenticated();
});

watch(isLoggedIn, () => {
  getTitle()
})

const getTitle = () => {
  if (!isLoggedIn.value) {
    title.value = 'Login';
  } else {
    title.value = 'Página inicial';
  }
}

onBeforeMount(() => {
  isLoggedIn.value = isUserAuthenticated();
  getTitle()
});
</script>
