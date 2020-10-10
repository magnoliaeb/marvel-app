<template>
  <v-app>
    <apNavBar />
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import apNavBar from './components/NavBar'

export default {
  name: "App",
  components: {
    apNavBar,
  },

};
</script>
