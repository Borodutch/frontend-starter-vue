<template lang="pug">
  .v-container.pa-4
    // Main content
    v-layout(column justify-center align-center).text-xs-center
      v-flex(xs12 md10)
        .headline.pb-4
          span {{$t('notFound')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NotFound extends Vue {}
</script>