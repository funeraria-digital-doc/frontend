import { createApp } from 'vue';
import App from './App.vue';
import '@vuepic/vue-datepicker/dist/main.css';
import router from './router';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import '@mdi/font/css/materialdesignicons.css';
import './assets/main.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: true,
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(LoadingPlugin);
app.use(vuetify).mount('#app');
