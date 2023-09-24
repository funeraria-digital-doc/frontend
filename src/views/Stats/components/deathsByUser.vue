<template>
  <h2>Serviços por funcionário</h2>
  <v-btn
    v-for="days in [30, 60, 90]"
    color="blue-darken-1"
    variant="text"
    @click="changePerDayDay(days)"
    :key="days"
    :disabled="daysToSearch == days"
  >
    Últimos {{ days }} dias
  </v-btn>
  <apexchart
    v-if="!isLoading"
    width="500"
    type="pie"
    :options="options"
    :series="series"
  ></apexchart>
  <v-container v-else class="login_spinner">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { updatePieChartData } from '../helper';
export default defineComponent({
  name: 'DeathsByUser',
  components: {
    apexchart: VueApexCharts,
  },
});
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getDeathsByUser } from '@/api/stats';
//Templates Chart
const daysToSearch = ref(30);
const isLoading = ref(false);
const options = ref({
  chart: {
    //width: 380,
    type: 'pie',
  },
  noData: {
    text: 'Não existem dados para este gráfico',
    align: 'center',
    verticalAlign: 'middle',
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
});

const series = ref([]);

const changePerDayDay = (day: number) => {
  daysToSearch.value = day;
  isLoading.value = true;
  getData();
};

const getData = async () => {
  getDeathsByUser(daysToSearch.value).then((resp) => {
    if (resp.success) {
      updatePieChartData(resp, options, series);
    } else {
      console.error('erro', resp);
    }
    isLoading.value = false;
  });
};
onMounted(() => {
  getData();
});
</script>
