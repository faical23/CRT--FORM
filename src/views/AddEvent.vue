<template>
  <div class="userDashBoard">
    <v-card elevation="2" style="padding: 1% 20%;">
      <img
        src="https://www.promovisitagadir.com/wp-content/uploads/2020/06/logo-crt-dark.svg"
        width="225px"
        style="cursor: pointer"
        @click="HomeReddirect()"
      />
    </v-card>
    <fixednav></fixednav>
    <v-container style="padding: 1% 20%;">

      <logOut></logOut>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nom de l'organisme"
          required
        ></v-text-field>

        <v-select
          :items="itemsLocalisation"
          :rules="localisationRules"
          v-model="Localisation"
          label="Localisation"
        ></v-select>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="Price"
          :rules="priceRules"
          label="Prix de l'offre"
          required
        ></v-text-field>

        <v-file-input
          accept="image/jpeg"
          placeholder="image de l'offre"
          prepend-icon="mdi-camera"
          label="Affiche  de l'offre"
          id="eventImage"
        ></v-file-input>

        <v-textarea
          :rules="decriptionRules"
          outlined
          name="input-7-4"
          label="Description de l’offre"
          v-model="Description"
          maxlength="440"
          @keydown="checkNumberOfChar"
        ></v-textarea>

        <p>{{characterLeft}}/440</p>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Valider
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "../../config";

import fixednav from "../components/fixedNavigation.vue";
import logOut from "../components/logoutBtn.vue"

export default {
  data: () => ({
    valid: false,
    characterLeft: 0,
    name: "",
    nameRules: [(v) => !!v || "Nome de l'événemment et obligatoir"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail et obligatoir",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    Localisation: "AGADIR",
    itemsLocalisation: [],
    localisationRules: [],

    Description: "",
    decriptionRules: [(v) => !!v || "description et obligatoire"]
  }),

  created() {
    axios.get(`${API_URL}/city/ALL`).then((response) => {
      response.data.map((elements) => {
        this.itemsLocalisation.push(elements.Name);
      });
    });
  },

  methods: {
    // showAlert() {
    //   this.$swal('Hello Vue world!!!');
    // },
    HomeReddirect() {
      window.open('https://tanmirt.searchcept.com/', '_blank');
    },
    checkNumberOfChar() {
      this.characterLeft = (this.Description).length
    },
    validate() {
      if (!this.$refs.form.validate()) return;

      this.valid = false;

      var EventImage = document.getElementById("eventImage");

      const formData = new FormData();
      formData.append("Email", this.email);
      formData.append("Name", this.name);
      formData.append("Description", this.Description);
      formData.append("Price", this.Price);
      formData.append("eventImg", EventImage.files[0]);
      formData.append("Localisation", this.Localisation);
      formData.append("isValid", false);

      axios
        .post(`${API_URL}/events/ADD`, formData)
        .then(() => {
          this.name = "";
          this.email = "";
          this.Description = "";
          this.Price = "";
          this.$router.push({ path: `/Confirmation` });
        })
        .catch((e) => {
          if (e.response.data.error) {
            this.$swal(e.response.data.error);
            this.valid = true;
          }
        });
    },
  },
  components: {
    fixednav,
    logOut
  },
};
</script>
