<template lang="pug">
v-app(
  :dark='$store.state.dark',
  :class='$store.state.dark ? "grey darken-4" : "grey lighten-4"'
)
  cookie-law(
    theme='blood-orange',
    :buttonText='$t("cookieButton")',
    :message='$t("cookieMessage")'
  )
  Navbar
  Snackbar
  v-main
    router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/Navbar.vue'
import Snackbar from '@/components/Snackbar.vue'
import store from '@/store'
import CookieLaw from 'vue-cookie-law'
import { i18n } from '@/plugins/i18n'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({ components: { Navbar, CookieLaw, Snackbar } })
export default class App extends Vue {
  @AppStore.State dark!: boolean
  @SnackbarStore.Mutation hideSnackbar!: () => void

  get style() {
    return {
      'background-color': this.dark ? '#303030' : '#fafafa',
    }
  }

  created() {
    this.$vuetify.theme.dark = this.dark

    const query = document.querySelector('meta[name="theme-color"]')
    if (query) {
      query.setAttribute('content', this.dark ? '#303030' : '#fafafa')
    }

    this.hideSnackbar()

    document.title = i18n.t('title') as string
  }

  get metaInfo() {
    return {
      title: i18n.t('title') as string,
    }
  }
}
</script>
