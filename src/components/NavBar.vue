<template>
  <div>
    <v-navigation-drawer
      v-if="getUser.isLogged"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
      clipped
    >
      <v-list-item class="px-2" three-line>
        <v-list-item-icon>
          <v-avatar color="primary" size="40">
            <span class="white--text">{{ getInicialsName }}</span>
          </v-avatar>
        </v-list-item-icon>

        <v-list-item-title>
          <span class="text-capitalize">{{ getUser.profile.displayName }}</span>
          <p class="grey--text">{{ getUser.profile.email }}</p>
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item color="primary" v-for="item in items" :key="item.title" :to="{ name: item.redirecTo }" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list dense>
          <v-list-item @click="logutUser">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left :z-index="1">
      <div class="d-flex align-center">
        <v-img
          @click="$router.push({ name: 'SignIn' })"
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/1200px-MarvelLogo.svg.png"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="changeTheme" v-if="!isDark"
        text
      >
        <v-icon left>mdi-weather-night</v-icon>
        <span class="mr-2">dark theme</span>
      </v-btn>
      <v-btn v-else @click="changeTheme"
        text
      >
        <v-icon left>mdi-weather-sunny</v-icon>
        <span class="mr-2">light theme</span>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  created () {
    const darkTheme = JSON.parse(localStorage.getItem('is-dark-theme'));
    if (darkTheme=== null || darkTheme === false) {
      this.$vuetify.theme.dark = false
      this.isDark = false
    } else {
      this.$vuetify.theme.dark = true
      this.isDark = true
    }
  },
  data() {
    return {
      isDark: false,
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home-city', redirecTo: 'Dashboard' },
        { title: 'Characters', icon: 'mdi-account-outline', redirecTo: 'ListCharacters' },
        { title: 'Comics', icon: 'mdi-arrange-send-backward' ,redirecTo: 'ListComics'},
        { title: 'Likes', icon: 'mdi-heart' ,redirecTo: 'ListLikes'},
      ],
      mini: false
    };
  },
 
  computed: {
    getInicialsName() {
      const fullName = this.getUser.profile.displayName || '';
      const fullNameArry = fullName.split(" ");
      const inicialsName = [];
      fullNameArry.forEach(name => {
        const inicial = name.charAt(0).toUpperCase();
        inicialsName.push(inicial);
      });

      return inicialsName.join('');
    },
    ...mapGetters(['getUser'])
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.isDark = !this.isDark
      localStorage.setItem('is-dark-theme', JSON.stringify(this.isDark));
    },
    logutUser() {
      this.$store.dispatch('logutUser').then(() => {
        this.$router.push({ name: 'SignIn' });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
