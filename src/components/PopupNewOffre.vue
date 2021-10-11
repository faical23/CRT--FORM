<template>
    <div class="NewPopup">
            <h2  v-if="NewOFFRE">Ajouter Offre</h2>
            <h2  v-if="UpdateOFFRE">Modifier Offre</h2>
            <h2  v-if="ShowOFFRE"> aperçu Offre</h2>
            <form>
                <div class="ZoneInput">
                    <span>Nom de l'organisme</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                        <input type="text" placeholder="Nom de l'organisation">
                    </div>
                </div>
                <div class="ZoneInput">
                    <span>Localisation</span>
                    <v-select
                        :items="itemsLocalisation"
                        v-model="ValueItemLocalisation"
                    ></v-select>
                </div>
                <div class="ZoneInput">
                    <span>Email</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                        <input type="text" placeholder="Exempe@gmail.com">
                    </div>
                </div>

                <div class="ZoneInput">
                    <span>Prix de l'offre</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                        <input type="text" placeholder="0 DH">
                    </div>
                </div>
                <div class="ZoneInput CoverImg">
                    <span>Affiche de l'offre</span>
                    <input type="file" hidden ref="ImgCover" @change="ImgCoverChanged()">
                    <div class="AddImg" @click="$refs.ImgCover.click()">
                        <img v-if="ImgCover != '' " :src="ImgCover" alt="">
                        <svg  v-if="ImgCover == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                    </div>
                </div>

                <div class="ZoneInput">
                    <span>Description de l'offre</span>
                    <div class="InputFaild">
                        <textarea placeholder="écrivez-lui votre description"> </textarea>
                    </div>
                </div>
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
            </form>
            <button v-if="NewOFFRE" >Ajouter</button>
            <button v-if="UpdateOFFRE">Modifier</button>
    </div>
    
</template>

<script>
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { icon } from "leaflet";
export default {
props: {
    PropsDataFromOffers:Object,
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
  data() {
      return {
            NewOFFRE:false,
            UpdateOFFRE:false,
            ShowOFFRE:false,
            RowClicked:'',

            itemsLocalisation:[
                'AGADIR',
                'AOURIR',
                'BENSARGAW',
                'CHTOUK AIT BAHA',
                'IMESOUIANE',
                'IMOUZZER',
                'INZEGANE',
                'TAFRAOUT',
                'TAGHAZOUT',
                'TALIOUINE',
                'TAROUDANT',
                'TATA',
                'TIOUT',
                'TIZNIT'
            ],
            ValueItemLocalisation:'AGADIR',
            ValueItemServices:'BIEN ETRE',
            ImgCover:'',
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


    valueItemsTwo: ["Wifi gratuit"],

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
    decriptionRules: [

    ],

      }

  },
  methods: {
    ImgCoverChanged(){
        let file = this.$refs.ImgCover.files[0]
        this.ImgCover = URL.createObjectURL(file);  
    },
    CheckCondition(){
        if(this.PropsDataFromOffers.Condition == "New"){
            this.NewOFFRE = true
        }
        else if(this.PropsDataFromOffers.Condition == "Update")
        {            
            this.UpdateOFFRE = true
        }
        else if(this.PropsDataFromOffers.Condition == "Show"){
            this.ShowOFFRE = true
        }
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
  }
  },
  mounted(){
      this.CheckCondition()
  },
    components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    
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
  
}
</script>

<style>

</style>