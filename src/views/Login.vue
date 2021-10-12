<template>
  <div class="confirmation">
    <!-- <fixednav></fixednav> -->
    <!-- <v-card elevation="2" style="padding: 1% 20%;">
      <img
        src="https://www.promovisitagadir.com/wp-content/uploads/2020/06/logo-crt-dark.svg"
        width="225px"
        style="cursor: pointer"
        @click="HomeReddirect()"
      />
    </v-card> -->
      <img
        src="https://searchcept.com/IMAGES/logoTanmirt.png"
        width="225px"
        style="cursor: pointer"
        @click="HomeReddirect()"
      />
    <v-container style="padding: 1% 20%;">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="FaildInput">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
            <input type="text" placeholder="E-mail" v-model="email" required>
        </div>
        <div class="FaildInput">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
            <input type="password" placeholder="Password" v-model="password" required>
        </div>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4 ConnexionBtn"
          @click="checkValidUser"
        >
          Connexion
        </v-btn>
      </v-form>
      <div class="LoginTanmirtLogo">
            <img src="http://localhost:8082/img/LOGO%20TANMIRT.0f2526e6.png" alt="">
      </div>
    </v-container>
  </div>
</template>

<style lang="scss">

</style>

<script>
import fixednav from "../components/fixedNavigation.vue";
import jwt_decode from "jwt-decode";

import axios from "axios"
import API_URL from "../../config"

export default {
  data: () => ({
      valid: false,
      email: "",
      password: ""
  }),
    methods: {
        checkValidUser() {
        axios
        .post(`${API_URL}/user/login`, {
          Email: this.email,
          Password: this.password
        })
        .then((response) => {
          var token = response.data.token;
          var decoded = jwt_decode(token);

          sessionStorage.setItem("user_id", decoded._id)
          sessionStorage.setItem("token", response.data.token)
          this.$router.push({ path: `/profile/${decoded._id}` });
          })
          .catch(err => {
          if (err.response.data.error) {
            this.$swal(err.response.data.error);
          }
        });
      },
    HomeReddirect() {
      window.open('https://tanmirt.searchcept.com/', '_blank');
    },
  },
  components: {
    fixednav,
  },
};
</script>
