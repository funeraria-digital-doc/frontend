<template class="group">
  <page v-if="funeral" :title="title">
    <div class="group__desc-container">
      <img
        class="group__img"
        src="@/assets/logo.png"
        alt="Imagem da funerária"
      />

      <aside class="group__desc text-subtitle-1 font-weight-light">
        {{ funeral?.description }}
      </aside>
    </div>

    <section class="group__services-container">
      <h6 class="text-h6">Serviços</h6>

      <v-list lines="two">
        <v-list-item
          v-for="(service, i) in funeral?.services"
          :key="i"
          :title="service.title"
          :subtitle="service.description"
        ></v-list-item>
      </v-list>
    </section>

    <v-carousel hide-delimiters class="group__contacts-container">
      <v-carousel-item v-for="(location, i) in funeral?.locations" :key="i">
        <div class="group__location">
          <div class="group__map">
            <l-map
              :zoom="16"
              :useGlobalLeaflet="false"
              :center="location.coords"
            >
              <l-tile-layer :url="mapLayer" />
              <l-marker :lat-lng="location.coords" />
            </l-map>
          </div>

          <p><b>Morada:</b> {{ location.address }}</p>

          <div class="group__contacts">
            <p><b>Telefone:</b> {{ location.phoneNumbers.join('; ') }}</p>
            <p><b>Email:</b> {{ location.email.join('; ') }}</p>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Page from '../../components/shared/Page/page.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { getGroup } from '../Groups/helper';
import type { Group } from '@/models/group.model';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';

const mapLayer =
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

const route = useRoute();
const funeral = ref<Group>();

const title = computed(() =>
  funeral?.value?.name ? `Funerária ${funeral.value.name}` : ''
);

onBeforeMount(() => {
  getGroup(route.params.id as string).then((group: any) => {
    funeral.value = group;
  });
});
</script>

<style lang="scss" src="./group.scss" />
