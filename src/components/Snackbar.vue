<template lang="pug">
div
  v-snackbar(
    app,
    v-model='safeActive',
    :timeout='4000',
    top,
    :color='color',
    flat
  )
    span {{ text }}
    v-btn(color='white', text, @click='hideSnackbar') {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import * as api from '@/utils/api'
import { namespace } from 'vuex-class'

const SnackbarStore = namespace('SnackbarStore')

@Component
export default class Snackbar extends Vue {
  @SnackbarStore.State active!: boolean
  @SnackbarStore.State color!: string
  @SnackbarStore.State message!: string
  @SnackbarStore.Mutation hideSnackbar!: () => void
  @SnackbarStore.Mutation setActive!: (active: boolean) => void

  get safeActive() {
    return this.active
  }
  set safeActive(active: boolean) {
    this.setActive(active)
  }

  get text() {
    const msg = this.message
    return typeof msg === 'string'
      ? msg === 'Internal Server Error'
        ? i18n.t('errors.internal')
        : i18n.t(this.message.toString())
      : (msg as any)[i18n.locale]
  }
}
</script>
