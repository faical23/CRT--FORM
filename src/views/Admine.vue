<template>
  <div>
    <v-card elevation="2" style="padding: 1% 20%">
      <img
        src="https://www.promovisitagadir.com/wp-content/uploads/2020/06/logo-crt-dark.svg"
        width="225px"
        @click="HomeReddirect()"
      />
    </v-card>

    <fixednav></fixednav>
    <v-container style="padding: 1% 20%">
      <h2>{{ hotelDetails.NomOrganisme }}</h2>

      <div class="logOut">
        <v-btn class="mx-2" fab dark large color="error" @click="userInfoFun">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-btn>
      </div>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nom de l'organisme"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          label="Avez-vous un site web ?"
          @click="test"
          required
        ></v-checkbox>

        <v-text-field
          v-if="checkbox"
          v-model="siteWeb"
          :rules="siteWebRules"
          label="Entrer le lien du site web"
          required
        ></v-text-field>

        <v-text-field
          v-model="facebook"
          :rules="facebookRules"
          label="Entrer le lien de votre page facebook"
          required
        ></v-text-field>

        <v-text-field
          v-model="instagram"
          :rules="instagramRules"
          label="Entrer le lien de votre page instagram"
          required
        ></v-text-field>

        <v-select
          v-model="valueItemsOne"
          :items="itemsOne"
          attach
          chips
          label="Catégorie"
          multiple
        ></v-select>

        <v-select
          v-model="valueItemsTwo"
          :items="itemsTwo"
          attach
          chips
          label="Services"
          multiple
        ></v-select>

        <v-text-field
          v-model="FullName"
          :rules="fullNameRules"
          label="Nom du responsable"
          required
        ></v-text-field>
        <v-text-field
          v-model="Tel"
          :rules="TelRules"
          label="Téléphone"
          required
        ></v-text-field>
        <v-text-field
          v-model="Poste"
          :rules="posteRules"
          label="Poste occupé"
          required
        ></v-text-field>
        <v-text-field
          v-model="Adress"
          :rules="AdressRules"
          label="Adresse"
          required
        ></v-text-field>
        <v-select
          :items="itemsLocalisation"
          :rules="localisationRules"
          v-model="Localisation"
          label="Localisation"
        ></v-select>

        <v-text-field
          v-model="InitialPrice"
          :rules="InitialPriceRules"
          label="Veuillez déterminer un prix attractif !"
          type="number"
          required
        ></v-text-field>

        <!-- <v-text-field
          v-model="Password"
          :rules="PasswordeRules"
          label="Mot de passe"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          v-model="RPassword"
          :rules="RPasswordeRules"
          label="Confirmer le mot de passe"
          type="password"
          required
        ></v-text-field> -->

        <v-file-input
          :rules="hotelImgRules"
          accept="image/jpeg"
          placeholder="Background image (.JPEG) (Taille minimale de la photo: 1400 X 400)"
          prepend-icon="mdi-camera"
          label="background image (.JPEG) (Taille minimale de la photo: 1400 X 400)"
          id="hotelBackroungImg"
          @change="hotelBackroungImgFun($event)"
        ></v-file-input>

        <v-file-input
          :rules="hotelImgRules"
          accept="image/jpeg"
          placeholder="image 1 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          prepend-icon="mdi-camera"
          label="image 1 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          id="hotelImgOne"
          @change="hotelImgOneFun($event)"
        ></v-file-input>

        <v-file-input
          :rules="hotelImgRules"
          accept="image/jpeg"
          placeholder="image 2 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          prepend-icon="mdi-camera"
          label="image 2 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          id="hotelImgTwo"
          @change="hotelImgTwoFun($event)"
        ></v-file-input>

        <v-file-input
          :rules="hotelImgRules"
          accept="image/jpeg"
          placeholder="image 3 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          prepend-icon="mdi-camera"
          label="image 3 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          id="hotelImgTree"
          @change="hotelImgTreeFun($event)"
        ></v-file-input>

        <v-file-input
          :rules="hotelImgRules"
          accept="image/jpeg"
          placeholder="image 4 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          prepend-icon="mdi-camera"
          label="image 4 (.JPEG) (Taille minimale de la photo: 800 X 800)"
          id="hotelImgFour"
          @change="hotelImgFourFun($event)"
        ></v-file-input>

        <v-textarea
          :rules="decriptionRules"
          outlined
          name="input-7-4"
          label="Description de l’organisme"
          v-model="Description"
          @keydown="checkNumberOfChar"
        ></v-textarea>

        <p>{{ characterLeft }}</p>

        <l-map
          ref="map"
          @click="onMapClick"
          :zoom="zoom"
          style="height: 300px; margin-bottom: 3%"
          :center="[
            position.lat || userLocation.lat || defaultLocation.lat,
            position.lng || userLocation.lng || defaultLocation.lng,
          ]"
        >
          <l-tile-layer
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
          />
          <l-marker
            v-if="position.lat && position.lng"
            visible
            draggable
            :icon="icon"
            :lat-lng.sync="position"
            @dragstart="dragging = true"
            @dragend="dragging = false"
          >
            <l-tooltip
              :content="tooltipContent"
              :options="{ permanent: true }"
            />
          </l-marker>
        </l-map>

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

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> TANMΣRT </v-card-title>

        <v-divider></v-divider>

        <div class="userInfoLists">
          <div class="userInfoList">
            <v-btn class="mx-2" fab dark large color="error" @click="logOutFun">
              <v-icon dark> mdi-logout </v-icon>
            </v-btn>
            <p>Déconnecté</p>
          </div>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "../../config";

import fixednav from "../components/fixedNavigation.vue";

import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { icon } from "leaflet";
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 30.425493,
        lng: -9.600704,
      }),
    },
  },
  data: () => ({
    characterLeft: 0,
    loading: false,
    userLocation: {},
    icon: icon({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    }),
    position: {},
    address: "",
    tileProvider: {
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    zoom: 10,
    dragging: false,

    valid: false,
    name: "",
    nameRules: [(v) => !!v || "Ce champ est obligatoire"],
    email: "",
    emailRules: [
      (v) => !!v || "Ce champ est obligatoire",
      (v) => /.+@.+\..+/.test(v) || "Adresse e-mail non valide",
    ],
    select: null,
    checkbox: false,

    itemsOne: [
      "Hôtel",
      "Restaurant",
      "Guide touristique / Accompagnateur",
      "Transport touristique",
      "Parc d'attractions et loisirs",
      "Parc de jeux",
      "Bazariste/artisan",
      "Agence de voyages",
      "Evénement",
      "Autre",
    ],
    valueItemsOne: [],

    itemsTwo: [
      "Wifi gratuit",
      "Center de fitness",
      "Center spa et bien-être",
      "Piscine",
      "Médecin sur demande",
      "Restaurant",
      "Café",
      "Lounge bar",
      "Autre",
    ],
    valueItemsTwo: [],

    FullName: "",
    fullNameRules: [],
    Tel: "",
    TelRules: [],
    Poste: "",
    posteRules: [],

    siteWeb: "",
    siteWebRules: [],

    facebook: "",
    facebookRules: [],

    instagram: "",
    instagramRules: [],

    hotelImgRules: [
      (value) =>
        !value ||
        value.size < 5000000 ||
        "la taille de l'image ne doit pas depasser 1mo",
    ],

    Description: "",
    decriptionRules: [

    ],

    // Localisation: "",
    // localisationRules: [
    //   v => !!v || 'localisation is required'
    // ],

    Adress: "",
    AdressRules: [],

    // Password: "",
    // PasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    // RPassword: "",
    // RPasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    InitialPrice: "",
    InitialPriceRules: [],

    Localisation: "",
    itemsLocalisation: [],
    localisationRules: [],

    dialog: false,

    hotelDetails: "",

    hotelImgBack: null,
    hotelImgOne: null,
    hotelImgTwo: null,
    hotelImgTree: null,
    hotelImgFour: null,
  }),

  created() {
    if (!sessionStorage.getItem("admine_token")) {
      return this.$router.push({ path: `/login` });
    }

    axios.get(`${API_URL}/city/ALL`).then((response) => {
      response.data.map((elements) => {
        this.itemsLocalisation.push(elements.Name);
      });
    });

    const token = sessionStorage.getItem("admine_token");
    const admineID = sessionStorage.getItem("admine_id");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${API_URL}/superAdmin/${admineID}`, config)
      .then((info) => {
        if (!info) {
          return this.$router.push({ path: `/login` });
        }
      })
      .catch((e) => {
        if (e) {
          return this.$router.push({ path: `/login` });
        }
      });

    axios
      .get(`${API_URL}/user/getOneHotelData/${this.$route.params.userID}`)
      .then((response) => {
        this.hotelDetails = response.data;

        this.name = response.data.NomOrganisme;
        this.email = response.data.Email;
        this.checkbox = response.data.HaveSiteweb;
        this.siteWeb = response.data.UserSiteweb;
        this.facebook =
          response.data.haveFacebook == "false"
            ? ""
            : response.data.haveFacebook;
        this.instagram =
          response.data.haveInstagram == "false"
            ? ""
            : response.data.haveInstagram;
        this.FullName = response.data.Nom;
        this.Tel = response.data.Tel;
        this.Poste = response.data.Post;
        this.Adress = response.data.Adress;
        this.Localisation = response.data.Localisation;
        this.InitialPrice = response.data.InitialPrice;
        this.Description = response.data.Description;

        response.data.Activite.map((data) => {
          this.valueItemsOne.push(data);
        });
        response.data.Services.map((data2) => {
          this.valueItemsTwo.push(data2);
        });
      });
  },
  mounted() {
    this.getUserPosition();
  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress();
        this.$emit("input", { position: value, address: this.address });
      },
    },
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>${this.address.replace(
        ",",
        "<br/>"
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }<br/> <strong>lng:</strong> ${this.position.lng}`;
    },
  },
  methods: {
    // showAlert() {
    //   this.$swal('Hello Vue world!!!');
    // },
    checkNumberOfChar() {
      this.characterLeft = this.Description.length;
    },
    validate() {
      if (!this.$refs.form.validate()) return;

      if (this.valueItemsOne.length == 0) {
        return this.$swal("Selectionner en mois une catégorie");
      }
      if (this.valueItemsTwo.length == 0) {
        return this.$swal("Selectionner en mois une service");
      }
      if(this.Description.length < 200) {
        return this.$swal("200 caractères au min");
      }

      this.valid = false;

      // var hotelBackroungImg = document.getElementById('hotelBackroungImg')
      // var hotelImgOne = document.getElementById('hotelImgOne')
      // var hotelImgTwo = document.getElementById('hotelImgTwo')
      // var hotelImgTree = document.getElementById('hotelImgTree')
      // var hotelImgFour = document.getElementById('hotelImgFour')

      const formData = new FormData();
      formData.append("NomOrganisme", this.name.trimEnd());
      formData.append("Email", this.email.trimEnd());
      formData.append("HaveSiteweb", this.checkbox);
      formData.append("UserSiteweb", this.siteWeb);
      formData.append("Nom", this.FullName);
      formData.append("Tel", this.Tel);
      formData.append("Post", this.Poste);
      formData.append("Description", this.Description);
      formData.append("Localisation", this.Localisation);
      formData.append("Adress", this.Adress);

      formData.append("haveFacebook", this.facebook);
      formData.append("haveInstagram", this.instagram);
      formData.append("InitialPrice", this.InitialPrice);
    //   formData.append("Password", this.Password.trimEnd());
    //   formData.append("CPassword", this.RPassword.trimEnd());

      formData.append(
        "hotelBackroungImg",
        this.hotelImgBack
          ? this.hotelImgBack
          : this.hotelDetails.hotelBackroungImg
      );
      formData.append(
        "hotelImgOne",
        this.hotelImgOne ? this.hotelImgOne : this.hotelDetails.hotelImgOne
      );
      formData.append(
        "hotelImgTwo",
        this.hotelImgTwo ? this.hotelImgTwo : this.hotelDetails.hotelImgTwo
      );
      formData.append(
        "hotelImgTree",
        this.hotelImgTree ? this.hotelImgTree : this.hotelDetails.hotelImgTree
      );
      formData.append(
        "hotelImgFour",
        this.hotelImgFour ? this.hotelImgFour : this.hotelDetails.hotelImgFour
      );

      formData.append(
        "lat",
        this.position.lat ? this.position.lat : "30.425493"
      );
      formData.append(
        "lng",
        this.position.lng ? this.position.lng : "-9.600704"
      );

      for (var i = 0; i < this.valueItemsOne.length; i++) {
        formData.append("Activite", this.valueItemsOne[i]);
      }

      for (var i = 0; i < this.valueItemsTwo.length; i++) {
        formData.append("Services", this.valueItemsTwo[i]);
      }

      // http://localhost:4000
      // https://crt.searchcept.com

      axios
        .put(
          `${API_URL}/user/updateUserForm/user/${this.$route.params.userID}`,
          formData
        )
        .then(() => {
          this.name = "";
          this.email = "";
          this.valueItemsOne = [];
          this.valueItemsTwo = [];
          this.checkbox = false;
          this.siteWeb = "";
          this.FullName = "";
          this.Tel = "";
          this.Poste = "";
          this.Description = "";
          this.Localisation = "";
          this.Adress = "";

          this.facebook = "";
          this.instagram = "";
          this.InitialPrice = "";
          this.Password = "";
          this.RPassword = "";

          sessionStorage.clear();
          this.$router.push({ path: `/UpdateConfirmation` });
        })
        .catch((e) => {
          if (e.response.data.error) {
            this.$swal(e.response.data.error);
            this.valid = true;
          }
        });
    },
    HomeReddirect() {
      window.open("https://tanmirt.searchcept.com/", "_blank");
    },
    userInfoFun() {
      this.dialog = true;
    },
    logOutFun() {
      sessionStorage.clear();
      window.location.reload();
      this.$router.push({ path: `/login` });
    },

    hotelBackroungImgFun(e) {
      this.hotelImgBack = e;
    },
    hotelImgOneFun(e) {
      this.hotelImgOne = e;
    },
    hotelImgTwoFun(e) {
      this.hotelImgTwo = e;
    },
    hotelImgTreeFun(e) {
      this.hotelImgTree = e;
    },
    hotelImgFourFun(e) {
      this.hotelImgFour = e;
    },

    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;

      console.log(this.position.lat);
      console.log(this.position.lng);
      return address;
    },
    onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng;
    },
    getUserPosition() {
      if (navigator.geolocation) {
        // get GPS position
        navigator.geolocation.getCurrentPosition((pos) => {
          // set the user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
  },
  components: {
    fixednav,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
};
</script>

<style lang="scss">
.logOut {
  position: absolute;
  right: 10%;
  top: 1%;
  @media (max-width: 990px) {
    right: 0;
    top: 0;
  }
}
.userInfoLists {
  .userInfoList {
    display: flex;
    justify-content: left;
    align-items: baseline;
    margin: 4% 0%;
    p {
      font-weight: bold;
    }
  }
}
</style>
