<template>
  <page title="">
    <div v-html="message" class="text-center"></div>
    <div class="text-center">
      <img src="/error-icon.png" class="img-max" />
    </div>
  </page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { onBeforeMount } from 'vue';
export default defineComponent({
  name: 'ErrorPage',
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const message = ref('');
onBeforeMount(() => {
  if (route.meta.status === 'service-unavailable') {
    message.value =
      '<h1>Serviço temporáriamente indisponível.</br>' +
      'Tente novamente mais tarde.</h1> </br> ' +
      '<h3>Se o problema presistir, contacte os administradores do sistema.</h3>';
  }

  if (route.meta.status === 'not-found') {
    message.value =
      '<h1>Endereço não encontrado.</h1> </br> ' +
      '<h3>Se o problema presistir, contacte os administradores do sistema.</h3>';
  }
});
</script>
<style scoped>
.img-max {
  max-width: 350px;
  width: 35%;
  margin-top: 6rem;
  height: auto;
}
</style>
