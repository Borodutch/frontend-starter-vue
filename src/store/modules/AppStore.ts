import { User } from '@/models/User'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  user?: User = undefined
  language?: string = undefined
  dark = false

  @Mutation
  setUser(user?: User) {
    this.user = user
  }

  @Mutation
  setLanguage(language: string) {
    this.language = language
  }

  @Mutation
  setDark(dark: boolean) {
    this.dark = dark
  }
}
