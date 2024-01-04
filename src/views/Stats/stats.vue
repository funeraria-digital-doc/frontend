<template>
  <page title="Estatísticas">
    <v-row>
      <v-col>
        <records-per-month></records-per-month>
      </v-col>
      <v-col>
        <records-per-day></records-per-day>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <deaths-by-district></deaths-by-district>
      </v-col>
      <v-col>
        <deaths-by-user></deaths-by-user>
      </v-col>
    </v-row>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import RecordsPerMonth from './components/recordsPerMonth.vue';
import RecordsPerDay from './components/recordsPerDay.vue';
import DeathsByDistrict from './components/deathsByDistrict.vue';
import DeathsByUser from './components/deathsByUser.vue';
export default defineComponent({
  name: 'Stats',
  components: {
    RecordsPerMonth,
    RecordsPerDay,
    DeathsByDistrict,
    DeathsByUser
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
</script>
