import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  paths: ['AppStore.user', 'AppStore.language', 'AppStore.dark'],
})
