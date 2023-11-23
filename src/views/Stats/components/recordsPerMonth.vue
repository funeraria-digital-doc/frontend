<template>
  <h2>Serviços por mês</h2>
  <v-btn
    v-for="months in [1, 3, 6]"
    color="blue-darken-1"
    variant="text"
    @click="changeMonthToSearch(months)"
    :key="months"
    :disabled="monthsToSearch == months"
  >
    {{ months == 1 ? 'Mês corrente' : 'Últimos ' + months + 'meses' }}
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
  name: 'RecordsPerMonth',
  components: {
    apexchart: VueApexCharts,
  },
});
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getRecordsPerMonth } from '@/api/stats';
import ptLocale from 'apexcharts/dist/locales/pt.json';
//Templates Chart
const monthsToSearch = ref(1);
const maxYAxis = ref(0);
const tickAmount = ref(0);
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
      format: 'MMM',
    },
  },
  yaxis: {
    max: maxYAxis,
    tickAmount: tickAmount,
    min: 0
  },
  tooltip: {
    x: {
      format: 'MM/yy',
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
    name: 'series-1',
    data: [],
  },
]);

const changeMonthToSearch = (day: number) => {
  monthsToSearch.value = day;
  getData();
};

const getData = async () => {
  getRecordsPerMonth(monthsToSearch.value).then((resp) => {
    if (resp.success) {
      updateLineChartData(resp, options, series, 10);
    } else {
      console.error('erro', resp);
    }
  });
};
onMounted(() => {
  getData();
});
</script>
