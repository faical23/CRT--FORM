<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <h1>dfsdfsdf</h1>
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Tableau de bord',
            icon: 'ni ni-tv-2 text-primary',
            path: '/TableauDeBord',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Offres',
            icon: 'ni ni-notification-70 text-pink',
            path: '/Offres',
          }"
        />

        <sidebar-item
          :link="{
            name: 'BienEtre',
            icon: 'ni ni-notification-70 text-pink',
            path: '/BienEtre',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Shopping',
            icon: 'ni ni-notification-70 text-pink',
            path: '/Shopping',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Excursion',
            icon: 'ni ni-notification-70 text-pink',
            path: '/Excursion',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Commentaires',
            icon: 'ni ni-notification-70 text-pink',
            path: '/Commentaires',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
