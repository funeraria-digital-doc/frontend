<template>
  <div v-if="funeraria">
    <funeraria-header :name="funeraria.name" :sub-title="funeraria.subTitle" />

    <funeraria-about
      :description="funeraria.description"
      :image="funeraria.image"
    />

    <funeraria-services
      :service-description="funeraria.serviceDescription"
      :services="funeraria.services"
    />

    <funeraria-deaths
      v-if="funeraria.deaths.length"
      :deaths="funeraria.deaths"
    />

    <funeraria-qas :qas="funeraria.qas" />

    <funeraria-contacts :contacts="funeraria.contacts" />

    <funeraria-locations :locations="funeraria.locations" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import FunerariaAbout from './components/funerariaAbout.vue';
import FunerariaContacts from './components/funerariaContacts.vue';
import FunerariaDeaths from './components/funerariaDeaths.vue';
import FunerariaHeader from './components/funerariaHeader.vue';
import FunerariaLocations from './components/funerariaLocations.vue';
import FunerariaQas from './components/funerariaQAs.vue';
import FunerariaServices from './components/funerariaServices.vue';

export default defineComponent({
  name: 'Funeraria',
  components: {
    FunerariaAbout,
    FunerariaContacts,
    FunerariaDeaths,
    FunerariaHeader,
    FunerariaLocations,
    FunerariaQas,
    FunerariaServices,
  },
});
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getGroup } from '../Groups/helper';
import type { Funeraria } from '@/models/funeraria.model';

const route = useRoute();
const funeraria = ref<Funeraria>();

onBeforeMount(() => {
  getGroup(route.params.id as string).then((group: any) => {
    funeraria.value = group;
  });
});
</script>

<style lang="scss">
.app__page {
  width: fit-content;
  margin: 0 !important;
}
</style>
