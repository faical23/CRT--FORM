<template>
  <div class="confirmation">
    <fixednav></fixednav>
    <v-card elevation="2" style="padding: 1% 20%;">
      <img
        src="https://www.promovisitagadir.com/wp-content/uploads/2020/06/logo-crt-dark.svg"
        width="225px"
        style="cursor: pointer"
        @click="HomeReddirect()"
      />
    </v-card>

    <v-container style="padding: 1% 20%;">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          label="Mot de passe"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="checkValidUser"
        >
          Connexion
        </v-btn>
      </v-form>
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
        .post(`${API_URL}/superAdmin/signIn`, {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          var token = response.data.token;
          var decoded = jwt_decode(token);

          sessionStorage.setItem("admine_id", decoded._id)
          sessionStorage.setItem("admine_token", response.data.token)
          this.$router.push({ path: `/admine/${this.$route.params.userID}` });
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
