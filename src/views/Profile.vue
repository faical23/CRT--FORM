<template>
  <div class="ProfileUserDashborad">
    <div class="BlackPage" v-if=" ShowMdpPopup || ShowPopupNewBienEtre || ShowPopupNewShopping || ShowPopupNewExursion || ShowPopupNewOffer" @click='RemovePopup'></div>
    <PopupNewShpping v-if="ShowPopupNewShopping" :PropsDataFromShppingToPopup='PropsDataFromShppingToPopup'  @ClosePopup='ClosePopup()'/>
    <PopupNewExursion v-if="ShowPopupNewExursion" :PropsDataFromExursion="PropsDataFromExursion"  @ClosePopup='ClosePopup()'/>
    <PopupNewBienEtre v-if="ShowPopupNewBienEtre" :PropsDataFromBineEtre="PropsDataFromBineEtre"  @ClosePopup='ClosePopup()' />
    <PopupMdp v-if="ShowMdpPopup"/>
    <div class="SideBareZone">
        <SIdeBare  @SwitchSideBare='SwitchSideBare'/>
    </div>
    <div class="ContentZone">
        <div Class="HeadrDashboard">
            <h3>TABLEAU DE BORD</h3>
              <button @click='LogoutFuntion()'>Logout</button>
        </div>
        <Accueil v-if="PageAccueil" />
        <BienEtreShpping  v-if="PageBienEtreShpping"  @OpenNewShopping='ShoppingFunction' :RefleshTheTableShopping="RefleshTheTableShopping" />
        <BienEtre v-if="PageBienEtre"  @OpenNewBienEtre='BienEtreFunction'  :RefleshTheTableShopping="RefleshTheTableShopping"  />
        <Excursion   v-if="PageExcursion" @OpenNewExursion='ExursionFunction'  :RefleshTheTableShopping="RefleshTheTableShopping"  />
        <FormUpdate v-if="VotreInformation"/>
        <Configuration v-if="PageConfiguration "/>
        <Comment v-if="PageComment " />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "../../config";

import fixednav from "../components/fixedNavigation.vue";
import logOut from "../components/logoutBtn.vue"

import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { icon } from "leaflet";
//// LAYOUT 
import SIdeBare from "../components/SideBarUser.vue"
import BienEtreShpping from "../components/BineEtreShpping.vue"
import BienEtre from "../components/BienEtre.vue"
import Excursion from "../components/Excursion.vue"
import Accueil from "../components/Accueil.vue"
import Comment from "../components/Comment.vue"

import FormUpdate from "../components/UpdateProfileUser.vue"
// import Configuration from "../components/Confugiration.vue"
import PopupNewShpping from "../components/PopupNewShpping.vue"
import PopupNewExursion from "../components/PoupNewExursion.vue"
import PopupNewBienEtre from "../components/PopupNewBienEtre.vue"
import  PopupMdp from "../components/PopupMDp.vue"


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

    /// NEW DATA
    PageComment:false,
    ShowMdpPopup:false,
    RefleshTheTableShopping : false,
    PageBienEtreShpping:false,
    PageExcursion:false,
    PageOffre:false,
    VotreInformation : false,
    PageConfiguration : false,
    ShowPopupUpdate:false,
    Connfiguration:false,
    ShowPopupShow:false,
    ShowPopupNewShopping:false,
    PropsDataFromShppingToPopup:'',
    ShowPopupNewExursion :false,
    PropsDataFromExursion: '',
    ShowPopupNewOffer:false,
    PropsDataFromOffers: '',
    PageBienEtre:false,
    ShowPopupNewBienEtre:false,
    PropsDataFromBineEtre:'',
    PageAccueil:true,

//////////////////////////////////
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
        value.size < 1000000 ||
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

    Password: "",
    // PasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    // RPassword: "",
    // RPasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    InitialPrice: "",
    InitialPriceRules: [],

    Localisation: "",
    itemsLocalisation: [],
    localisationRules: [],

    hotelDetails: "",

    isSelectedhotelImgBack: null,
    isSelectedhotelImgOne: null,
    isSelectedhotelImgTwo: null,
    isSelectedhotelImgTree: null,
    isSelectedhotelImgFour: null,

    hotelImgBack: null,
    hotelImgOne: null,
    hotelImgTwo: null,
    hotelImgTree: null,
    hotelImgFour: null
  }),
  components: {
    fixednav,
    logOut,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    SIdeBare,
    BienEtreShpping,
    Excursion,
    FormUpdate,
    // Configuration,
    PopupNewShpping,
    PopupNewExursion,
    BienEtre,
    PopupNewBienEtre,
    Accueil,
    PopupMdp,
    Comment
  },
  created() {
      this.Password = sessionStorage.getItem('userPass')
      if (!sessionStorage.getItem("token")) {
        return this.$router.push({ path: `/login` });
      }

    axios.get(`${API_URL}/city/ALL`).then((response) => {
      response.data.map((elements) => {
        this.itemsLocalisation.push(elements.Name);
      });
    });

    const token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${API_URL}/user/findUser/${this.$route.params.userID}`, config)
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
        console.log(response.data)
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

        this.isSelectedhotelImgBack = response.data.hotelBackroungImgC.selectImage
        this.isSelectedhotelImgOne = response.data.hotelImgOneC.selectImage
        this.isSelectedhotelImgTwo = response.data.hotelImgTwoC.selectImage
        this.isSelectedhotelImgTree = response.data.hotelImgTreeC.selectImage
        this.isSelectedhotelImgFour = response.data.hotelImgFourC.selectImage
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
    LogoutFuntion(){
        this.$router.push({ path: `/login` });
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        sessionStorage.removeItem(("user_id"))
        sessionStorage.removeItem(("token"))
    },
    ClosePopup() {
      this.ShowPopupNewShopping = false
      this.ShowPopupNewExursion =false
      this.ShowPopupNewBienEtre =false
      this.ShowMdpPopup = false
      this.RefleshTheTableShopping ? this.RefleshTheTableShopping = false : this.RefleshTheTableShopping = true
    },
    SwitchSideBare(PageSwitch){
        this.PageBienEtreShpping = false
        this.PageExcursion = false
        this.PageOffre = false
        this.VotreInformation = false
        this.PageConfiguration = false
        this.PageBienEtre = false
        this.PageAccueil= false
        this.PageComment = false
      if(PageSwitch == "BienEtreShopping")
        this.PageBienEtreShpping = true
      else if(PageSwitch == "Excursion")
        this.PageExcursion = true
      else if(PageSwitch == "Offre")
        this.PageOffre = true
      else if(PageSwitch == "VotreInformation")
        this.VotreInformation = true
      else if(PageSwitch == "Confugiration")
      {
        this.VotreInformation = true
        this.ShowMdpPopup = true
      }
      else if(PageSwitch == "BienEtre")
        this.PageBienEtre = true
      else if(PageSwitch == "Accueil")
        this.PageAccueil= true
        else if(PageSwitch == "Comment")
        this.PageComment = true
    },
    RemovePopup(){
      this.ShowPopupNewShopping = false
      this.ShowPopupNewExursion  = false
      this.ShowPopupNewOffer = false
      this.ShowPopupNewBienEtre =  false
      this.ShowMdpPopup = false

    },
    ShoppingFunction(Condition){
      this.ShowPopupNewShopping = true
      this.PropsDataFromShppingToPopup = Condition
    },
    ExursionFunction(Condition){
      this.ShowPopupNewExursion = true
      this.PropsDataFromExursion = Condition
    },
    OfferFunction(Condition){
      this.ShowPopupNewOffer = true
      this.PropsDataFromOffers= Condition
    },
    BienEtreFunction(Condition){
      this.ShowPopupNewBienEtre = true
      this.PropsDataFromBineEtre = Condition
    },
    


    //////////////////////////////


    OpenUpdatePopup(ID){
      this.ShowPopupUpdate = true
    },
    OpenShowPopup(ID){
      this.ShowPopupShow= true
    },
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
      // formData.append("Password", this.Password);
      // formData.append("CPassword", this.RPassword);

      formData.append(
        "hotelBackroungImg",
        this.isSelectedhotelImgBack
          ? this.hotelDetails.hotelBackroungImgC
          : this.hotelImgBack
      );
      formData.append(
        "hotelImgOne",
        this.isSelectedhotelImgOne ? this.hotelDetails.hotelImgOneC : this.hotelImgOne
      );
      formData.append(
        "hotelImgTwo",
        this.isSelectedhotelImgTwo ? this.hotelDetails.hotelImgTwoC : this.hotelImgTwo
      );
      formData.append(
        "hotelImgTree",
        this.isSelectedhotelImgTree ? this.hotelDetails.hotelImgTreeC : this.hotelImgTree
      );
      formData.append(
        "hotelImgFour",
        this.isSelectedhotelImgFour ? this.hotelDetails.hotelImgFourC : this.hotelImgFour
      );

      formData.append(
        "lat",
        this.position.lat ? this.position.lat : this.hotelDetails.lat
      );
      formData.append(
        "lng",
        this.position.lng ? this.position.lng : this.hotelDetails.lng
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
