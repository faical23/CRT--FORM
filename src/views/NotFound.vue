<template>
  <div class="NotFound">
      <h1>PAGE NOT FOUND</h1>
      <button @click="RederectToHome()">Back To Home</button>
  </div>
</template>

<style lang="scss">

</style>

<script>


export default {
  data: () => ({

  }),
    methods: {
    RederectToHome(){
        this.$router.push({ path: `/` });
    }

  },
  components: {
  },
};
</script>
