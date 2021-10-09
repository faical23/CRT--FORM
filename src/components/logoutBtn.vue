<template>
<div>
    <div class="logOut">
        <v-btn class="mx-2" fab dark large color="error" @click="userInfoFun">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-btn>
    </div>

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
          <div class="userInfoList">
            <v-btn class="mx-2" fab dark large color="amber">
              <v-icon dark> mdi-map-check </v-icon>
            </v-btn>
            <p>Votre Excursions</p>
          </div>
          <div class="userInfoList">
            <v-btn class="mx-2" fab dark large color="amber">
              <v-icon dark> mdi-earth  </v-icon>
            </v-btn>
            <p>Votre Offres</p>
          </div>
          <div class="userInfoList">
            <v-btn class="mx-2" fab dark large color="amber">
              <v-icon dark> mdi-store </v-icon>
            </v-btn>
            <p>Votre BienEtre / Shopping</p>
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
export default {
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    userInfoFun() {
      this.dialog = true;
    },
    logOutFun() {
      sessionStorage.clear();
      this.$router.push({ path: `/login` });
    },
  },
}
</script>

<style>

</style>