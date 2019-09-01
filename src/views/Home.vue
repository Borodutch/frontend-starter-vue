<template lang="pug">
  .v-container.pa-4
    // Main content
    v-layout(column
    justify-center
    align-center).text-center
      v-flex(xs12 md10)
        .headline.pb-4
          span(v-html='$t("home.info")')
        p {{$t('home.rules.register')}}
        p {{$t('home.rules.money')}}
        p {{$t('home.rules.success')}}
        
      v-flex.pt-4
        vue-telegram-login(mode='callback'
        telegram-login='mamkintrade_bot'
        @callback='onTelegramAuth'
        radius='3'
        :userpic='false')
        g-signin-button(:params='{ client_id: googleClientId }'
        @success='onGoogleSignInSuccess'
        @error='onGoogleSignInError') {{$t("home.google")}}
        fb-signin-button(:params='{ scope: "email", return_scopes: true}'
        @success='onFacebookSignInSuccess'
        @error='onFacebookSignInError') {{$t('home.facebook')}}
        .vk-signin-button(@click.stop='vkDialog = true') {{$t('home.vk')}}
        .api-signin-button(@click.stop='keyDialog = true') {{$t('home.key')}}

      v-flex.pt-4
        .caption
          router-link(to='/privacy') {{ $t('home.privacy') }}
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { loginFacebook, loginTelegram, loginGoogle } from "../utils/api";
import * as store from "../plugins/store";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";
const { vueTelegramLogin } = require("vue-telegram-login");

// FB object is global, declaring here for TS
declare const FB: any;

@Component({
  components: {
    vueTelegramLogin
  }
})
export default class Home extends Vue {
  get googleClientId() {
    return "906458427314-vrgseuf6gsroa41l88005jqko24g8shs.apps.googleusercontent.com";
  }

  onFacebookSignInSuccess(response: any) {
    FB.api("/me", async (dude: any) => {
      try {
        const user = await loginFacebook(response.authResponse.accessToken);
        store.setUser(user);
        this.$router.replace("app");
      } catch (err) {
        store.setSnackbar({
          message: "errors.facebook",
          color: "error",
          active: true
        });
      }
    });
  }
  onFacebookSignInError(error: Error) {
    store.setSnackbar({
      message: "errors.facebook",
      color: "error",
      active: true
    });
  }
  async onGoogleSignInSuccess(googleUser: any) {
    try {
      const user = await loginGoogle(googleUser.getAuthResponse().id_token);
      store.setUser(user);
      this.$router.replace("cabinet");
    } catch (err) {
      store.setSnackbar({
        message: "errors.google",
        color: "error",
        active: true
      });
    }
  }
  onGoogleSignInError(error: Error) {
    store.setSnackbar({
      message: "errors.google",
      color: "error",
      active: true
    });
  }
  async onTelegramAuth(loginInfo: any) {
    try {
      const user = await loginTelegram(loginInfo);
      store.setUser(user);
      this.$router.replace("cabinet");
    } catch (err) {
      store.setSnackbar({
        message: "errors.telegram",
        color: "error",
        active: true
      });
    }
  }
}
</script>

<style>
.fb-signin-button {
  cursor: pointer;
  display: block;
  padding: 10px 46px;
  border-radius: 3px;
  background-color: #647daf;
  color: #fff;
  margin: 10px;
}
.g-signin-button {
  margin: 10px;
  cursor: pointer;
  display: block;
  padding: 10px 46px;
  border-radius: 3px;
  background-color: #ce5658;
  color: #fff;
}
</style>
