<template>
  <h2>Declarações criadas por dia</h2>
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
    type="area"
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
import { updateLineChartData } from '../helper';
export default defineComponent({
  name: 'RecordsChart',
  components: {
    apexchart: VueApexCharts,
  },
});
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getDeathsPerDay } from '@/api/stats';
import ptLocale from 'apexcharts/dist/locales/pt.json';
//Records Chart
const daysToSearch = ref(30);
const isLoading = ref(false);
const options = ref({
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
    locales: [ptLocale],
    defaultLocale: 'pt',
  },
  forceNiceScale: true,
  noData: {
    text: 'Não existem dados para este gráfico',
    align: 'center',
    verticalAlign: 'middle',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'dd MMM',
    },
  },
  yaxis: {
    max: 0,
    tickAmount: 0,
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy',
    },
    theme: 'dark',
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="arrow_box">' +
        '<span>' +
        series[seriesIndex][dataPointIndex] +
        '</span>' +
        '</div>'
      );
    },
  },
});

const series = ref([
  {
    name: 'series-2',
    data: [],
  },
]);

const changePerDayDay = (day: number) => {
  daysToSearch.value = day;
  isLoading.value = true;
  getData();
};

const getData = async () => {
  getDeathsPerDay(daysToSearch.value).then((resp) => {
    if (resp.success) {
      updateLineChartData(resp, options, series);
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
