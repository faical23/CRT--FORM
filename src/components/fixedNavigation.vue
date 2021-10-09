<template>
  <div class="buttonNavigation">
    <div class="UserDashLogo">
      <img
        src="https://www.promovisitagadir.com/wp-content/uploads/2020/07/visite-agadir.png"
        @click="HomeReddirect()"
      />
    </div>

    <router-link :to="'/addBienEtreShop/'+ $route.params.userID" v-if="isLoged" class="navgationLists">
      <v-btn rounded color="primary" dark>
        Ajouter Bien Etre / Shopping
      </v-btn>
    </router-link>

    <router-link :to="'/addExcursuin/' + $route.params.userID" v-if="isLoged" class="navgationLists">
      <v-btn rounded color="primary" dark>
        Ajouter Excursion
      </v-btn>
    </router-link>

    <router-link :to="'/addEvent/' + $route.params.userID" v-if="isLoged" class="navgationLists">
      <v-btn rounded color="primary" dark>
        Ajouter une offre
      </v-btn>
    </router-link>

    <router-link :to="'/profile/' + $route.params.userID" v-if="isLoged" class="navgationLists">
      <v-btn rounded color="primary" dark>
        Votre information
      </v-btn>
    </router-link>

    <router-link to="/" v-if="!isLoged" class="navgationLists InscriptionBtn">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
          <p>Inscription</p>
      </router-link>

    <router-link to="/login" v-if="!isLoged" class="navgationLists ConnexionBtn">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M11 10V12H9V14H7V12H5.8C5.4 13.2 4.3 14 3 14C1.3 14 0 12.7 0 11S1.3 8 3 8C4.3 8 5.4 8.8 5.8 10H11M3 10C2.4 10 2 10.4 2 11S2.4 12 3 12 4 11.6 4 11 3.6 10 3 10M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M16 12C13.8 12 12 10.2 12 8S13.8 4 16 4 20 5.8 20 8 18.2 12 16 12Z" /></svg>
      <p>Connexion</p>
    </router-link>

    <v-progress-circular
      :size="70"
      :width="10"
      color="purple"
      indeterminate
      class="ml-10"
      v-if="showFixedNav"
    ></v-progress-circular>
  </div>
</template>

<style lang="scss">

</style>

<script>
import axios from "axios";
import API_URL from "../../config";

export default {
  name: "navigation",
  data: () => ({
    isLoged: false,
    showFixedNav: true
  }),
  created() {
    setTimeout(() => {
      this.showFixedNav = false
    }, 3000)

    this.Password = sessionStorage.getItem('userPass')
    this.RPassword = sessionStorage.getItem('userPass')
    if (!sessionStorage.getItem("token")) {
      return this.isLoged = false
    }

    const token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${API_URL}/user/findUser/${this.$route.params.userID}`, config)
      .then((info) => {
        if (!info) {
          return this.isLoged = false
        }
        this.isLoged = true
      })
      .catch((e) => {
        if (e) {
          return this.isLoged = false
        }
      });
  },
  methods: {},
};
</script>
