<template>
  <div class="funeraria-locations__container">
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(location, i) in locations" :key="i">
        <div>
          <div class="funeraria-locations__map">
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
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang="ts">
import type { FunerariaLocation } from '@/models/funeraria.model';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'FunerariaMap',
  props: {
    locations: {
      type: Array as PropType<FunerariaLocation[]>,
      required: true,
    },
  },
});
</script>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';

const mapLayer =
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
</script>

<style scoped lang="scss">
.funeraria-locations {
  &__container {
    margin-bottom: 3vw;
  }

  &__map {
    height: 20rem;
  }
}
@media screen and (max-width: 1024px) {
  .funeraria-locations {
    &__container {
      margin-bottom: 5vw;
    }
  }
}
.v-carousel {
  height: auto !important;
}
</style>
