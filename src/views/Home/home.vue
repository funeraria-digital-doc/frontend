<template>
  <page title="Página inicial">
    <div class="spacer-2"></div>
    <p>
      Plataforma para agilizar e gerir os documentos referentes ao processo de
      declarar um falecimento.
    </p>
    <home-stats></home-stats>
  </page>
</template>

<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
import HomeStats from './components/homeStats.vue'
</script>
<style scoped>
.spacer-2{
  height: 2rem
}
</style>
