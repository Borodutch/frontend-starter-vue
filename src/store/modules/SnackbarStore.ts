import { LocalizedError } from '@/models/LocalizedError'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'SnackbarStore' })
export default class SnackbarStore extends VuexModule {
  message: String | LocalizedError = ''
  active: boolean = false
  color: String = 'success'

  @Mutation
  setSnackbar(snackbarStore: SnackbarStore) {
    Object.assign(this, snackbarStore)
  }

  @Mutation
  setActive(active: boolean) {
    this.active = active
  }

  @Mutation
  setSnackbarError(error: string) {
    this.message = error
    this.active = true
    this.color = 'error'
  }

  @Mutation
  setSnackbarSuccess(message: string) {
    this.message = message
    this.active = true
    this.color = 'success'
  }

  @Mutation
  hideSnackbar() {
    this.active = false
  }
}
