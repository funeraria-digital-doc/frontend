<template>
  <h2>Serviços por dia</h2>
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
    width="500"
    type="area"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { updateLineChartData } from '../helper';
export default defineComponent({
  name: 'RecordsPerDay',
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
  getData();
};

const getData = async () => {
  await getDeathsPerDay(daysToSearch.value).then((resp) => {
    if (resp.success) {
      updateLineChartData(resp, options, series, 1);
    } else {
      console.error('erro', resp);
    }
  });
};
onMounted(() => {
  getData();
});
</script>
