import AppStore from '@/store/modules/AppStore'
import SnackbarStore from '@/store/modules/SnackbarStore'
import persistentState from '@/store/plugins/persistentState'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppStore,
    SnackbarStore,
  },
  plugins: [persistentState],
})

export default store
