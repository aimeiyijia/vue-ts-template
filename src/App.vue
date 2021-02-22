<template>
  <div id="app">
    <service-worker-update-popup />
    <test></test>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
import test from '@/views/test/test.tsx'

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup,
    test
  }
})
export default class extends Vue {}
</script>
