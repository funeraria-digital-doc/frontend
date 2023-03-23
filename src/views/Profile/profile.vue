<template>
  <page title="Profile">
    <h4>Name: {{ user.name }}</h4>
  </page>
</template>

<script lang="ts" setup>
import { useUser } from "@/composables/user";
import Page from "../../components/shared/Page/page.vue";
const { user } = useUser();
</script>
