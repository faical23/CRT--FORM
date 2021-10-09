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
    <v-container style="padding: 1% 20%; height: 100%;">
      <div class="contents">
        <img src="../assets/LOGO TANMIRT.png" class="logo" />
        <v-alert dense text type="success">
          <!-- I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of success -->
          Votre formulaire à été bien modifié.
        </v-alert>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss">
.confirmation {
  height: 80vh;
  .logo {
    width: 50%;
    @media (max-width: 990px) {
      width: 100%;
    }
  }
  .contents {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }
}
</style>

<script>
import fixednav from "../components/fixedNavigation.vue"

export default {
  data: () => ({}),
  methods: {
    HomeReddirect() {
      window.open('https://tanmirt.searchcept.com/', '_blank');
    },
  },
      components: {
      fixednav
    }
};
</script>
