<template>
  <page :title="title"> </page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Page from '../../components/shared/Page/page.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { getGroup } from '../Groups/helper';
import type { Group } from '@/models/group.model';

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
