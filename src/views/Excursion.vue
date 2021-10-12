<template>
  <div class="userDashBoard">
    <v-card elevation="2" style="padding: 1% 20%">
      <img
        src="https://www.promovisitagadir.com/wp-content/uploads/2020/06/logo-crt-dark.svg"
        width="225px"
        @click="HomeReddirect()"
      />
    </v-card>

    <fixednav></fixednav>
    <v-container style="padding: 1% 20%">
      <h2>EXCURSION</h2>

      <logOut></logOut>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nom de Circuit"
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

        <v-text-field
          v-model="Tel"
          :rules="TelRules"
          label="Téléphone"
          required
        ></v-text-field>

        <v-select
          :items="itemsLocalisation"
          :rules="localisationRules"
          v-model="Localisation"
          label="Ville ou point de départ"
        ></v-select>

        <!-- <v-select
          v-model="valueItemsTwo"
          :items="itemsTwo"
          attach
          chips
          label="Services"
          multiple
        ></v-select> -->

        <v-text-field
          v-model="InitialPrice"
          :rules="InitialPriceRules"
          label="Veuillez déterminer un prix attractif (en DH)"
          type="number"
          required
        ></v-text-field>

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
          label="Description (programme)"
          v-model="Description"
          @keydown="checkNumberOfChar"
        ></v-textarea>
        <p style="margin-top: -2%">{{ characterLeft }}</p>

        <v-row class="mb-5">
          <v-col>
            <v-alert type="info"> Date de début </v-alert>
            <v-date-picker
              v-model="date"
              class="mt-4"
              :min="minDate"
            ></v-date-picker>
          </v-col>
          <v-col>
            <v-alert type="info"> Date de fin </v-alert>
            <v-date-picker
              v-model="dateTwo"
              class="mt-4"
              :min="date"
            ></v-date-picker>
          </v-col>
        </v-row>

        <!-- map style="height: 300px" -->
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
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-if="!valid"
        ></v-progress-circular>

      </v-form>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> TANMΣRT </v-card-title>

        <!-- <v-card-text>
          Votre formu
        </v-card-text> -->

        <v-divider></v-divider>

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
import logOut from "../components/logoutBtn.vue"
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
      "Kids club",
      "Salles de conférence",
      "Sallon de beauté",
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
        value.size < 1000000 ||
        "la taille de l'image ne doit pas depasser 1mo",
    ],

    Description: "",
    decriptionRules: [],

    // Localisation: "",
    // localisationRules: [
    //   v => !!v || 'localisation is required'
    // ],

    Adress: "",
    AdressRules: [],

    Password: "promovisiteagadir",
    // PasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    RPassword: "promovisiteagadir",
    // RPasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    InitialPrice: "",
    InitialPriceRules: [],

    Localisation: "AGADIR",
    itemsLocalisation: [],
    localisationRules: [],

    UserRole: "EXCURSION",
    itemsUserRole: ["SHOPPING", "BIEN ETRE"],
    UserRoleRules: [],

    dialog: false,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateTwo: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    minDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    hotelImgBack: null,
    hotelImgOne: null,
    hotelImgTwo: null,
    hotelImgTree: null,
    hotelImgFour: null
  }),

  created() {
    axios.get(`${API_URL}/city/ALL`).then((response) => {
      response.data.map((elements) => {
        this.itemsLocalisation.push(elements.Name);
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
    validate() {
      if (!this.$refs.form.validate()) return;

      if (this.Description.length < 200) {
        return this.$swal("200 caractères au min");
      }

      // var hotelBackroungImg = document.getElementById("hotelBackroungImg");
      // var hotelImgOne = document.getElementById("hotelImgOne");
      // var hotelImgTwo = document.getElementById("hotelImgTwo");
      // var hotelImgTree = document.getElementById("hotelImgTree");
      // var hotelImgFour = document.getElementById("hotelImgFour");

      if(!this.hotelImgBack) {
        return this.$swal("entrer background image");
      }
      if(!this.hotelImgOne) {
        return this.$swal("entrer image principale de l'organisme (image 1)");
      }

      this.valid = false;

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
      formData.append("userRole", this.UserRole);
      formData.append("Adress", this.Adress);
      formData.append("fromOrg", this.$route.params.userID)
      formData.append("haveFacebook", this.facebook);
      formData.append("haveInstagram", this.instagram);
      formData.append("InitialPrice", this.InitialPrice);
      formData.append("Password", this.Password);
      formData.append("CPassword", this.RPassword);

      formData.append(
        "hotelBackroungImg",
        this.hotelImgBack
      );
      formData.append(
        "hotelImgOne",
        this.hotelImgOne
      );
      formData.append(
        "hotelImgTwo",
        this.hotelImgTwo
      );
      formData.append(
        "hotelImgTree",
        this.hotelImgTree
      );
      formData.append(
        "hotelImgFour",
        this.hotelImgFour
      );

      formData.append("StartAt", this.date);
      formData.append("EndAt", this.dateTwo);

      formData.append(
        "lat",
        this.position.lat ? this.position.lat : "-9.600704"
      );
      formData.append(
        "lng",
        this.position.lng ? this.position.lng : "30.425493"
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
        .post(`${API_URL}/user/saveForm?userID=${this.$route.params.userID}`, formData)
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

          this.$router.push({ path: `/Confirmation` });
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
    logOut,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
};
</script>
