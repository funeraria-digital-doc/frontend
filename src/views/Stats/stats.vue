<template>
  <page title="Estatísticas">
    <v-row>
      <v-col :cols="6" :sm="12" :md="12" :lg="6" :xl="4">
        <templates-chart></templates-chart>
      </v-col>
      <v-col :cols="6" :sm="12" :md="12" :lg="6" :xl="4">
        <records-chart></records-chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6" :sm="12" :md="12" :lg="6" :xl="4">
        <deaths-by-district></deaths-by-district>
      </v-col>
      <v-col :cols="6" :sm="12" :md="12" :lg="6" :xl="4">
        <deaths-by-user></deaths-by-user>
      </v-col>
    </v-row>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TemplatesChart from './components/templatesChart.vue';
import RecordsChart from './components/recordsChart.vue';
import DeathsByDistrict from './components/deathsByDistrict.vue';
import DeathsByUser from './components/deathsByUser.vue';
export default defineComponent({
  name: 'Stats',
  components: {
    TemplatesChart,
    RecordsChart,
    DeathsByDistrict,
    DeathsByUser
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
</script>
