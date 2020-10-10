<template>
  <div class="">
      <v-container grid-list-md>
      <h1>Your favorite characters and comics here</h1>
     
        <v-row class="pt-4">
          <v-tabs v-model="activeTab">
            <v-tab
              v-for="tab in tabs"
              :key="tab.id"
              :to="{ name: tab.redirecTo }"
              >{{ tab.name }}</v-tab
            >
          </v-tabs>
          <v-col cols="12">
          <router-view  />
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
    activeTab: null,
      tabs: [
        { id: '1', name: 'Characters', redirecTo: 'LikeCharacters' },
        { id: '2', name: 'Comics', redirecTo: 'LikeComics' }
      ]
    };
  },
 

};
</script>
