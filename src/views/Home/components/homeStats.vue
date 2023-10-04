<template>
  <div class="spacer-2"></div>
  <v-row>
    <v-col cols="4" sm="4" md="4" lg="4">
      <v-card class="px-6 py-6 rounded maxWidth">
        <h2>Serviços de {{ month }}</h2>
        <AnimatedCounter
          v-if="currentMonthCount != 0"
          :value="currentMonthCount"
          :duration="200"
          class="counter"
        />
        <p v-else class="counter">0</p>
      </v-card>
    </v-col>
    <v-col cols="4" sm="4" md="4" lg="4">
      <v-card class="px-6 py-6 rounded maxWidth">
        <h2>Serviços de {{ year }}</h2>
        <AnimatedCounter
          v-if="currentYearCount != 0"
          :value="currentYearCount"
          :duration="200"
          class="counter"
        />
        <p v-else class="counter">0</p>
      </v-card>
    </v-col>
    <v-col cols="4" sm="4" md="4" lg="4">
      <v-card class="px-6 py-6 rounded maxWidth">
        <h2>Melhor Mês do Ano</h2>
        <h3 v-if="bestMonth" class="counter">{{ bestMonth }}</h3>
        <h3 v-else class="counter">---</h3>
      </v-card>
    </v-col>
  </v-row>
  <div class="spacer-2"></div>
  <div class="redirect_btn">
    <v-btn color="primary" dark @click="goToRoute">Ver Mais</v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AnimatedCounter from 'vue-animated-counter';
import {
  getCurrentMonthStats,
  getCurrentYearStats,
  getBestMonthStats,
} from '@/api/stats';
export default defineComponent({
  name: 'HomeStats',
});
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const currentMonthCount = ref(0);
const currentYearCount = ref(0);
const bestMonth = ref('');
const formatter = new Intl.DateTimeFormat('pt', { month: 'long' });
const date = formatter.format(new Date());
const month = date.charAt(0).toUpperCase() + date.slice(1);
const year = new Date().getFullYear();
const router = useRouter();
const goToRoute = () => {
  router.push({ name: 'stats' });
};

const getCurrentMonthData = async () => {
  getCurrentMonthStats().then((resp) => {
    if (resp.success) {
      currentMonthCount.value = resp.data.result;
    } else {
      currentMonthCount.value = 0;
      console.error('erro', resp);
    }
  });
};

const getCurrentYearData = async () => {
  getCurrentYearStats().then((resp) => {
    if (resp.success) {
      currentYearCount.value = resp.data.result;
    } else {
      currentYearCount.value = 0;
    }
  });
};

const getBestMonthData = async () => {
  getBestMonthStats().then((resp) => {
    if (resp.success) {
      bestMonth.value = resp.data.result;
    } else {
      console.error('erro', resp);
      bestMonth.value = '';
    }
  });
};

onMounted(() => {
  getCurrentMonthData();
  getCurrentYearData();
  getBestMonthData();
});
</script>
<style scoped>
.counter {
  font-size: 40px;
}
.maxWidth {
  max-width: 400px;
}

.spacer-2 {
  height: 2rem;
}

.redirect_btn {
  display: flex;
  justify-content: end;
}
</style>
