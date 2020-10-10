<template>
  <div tile flat elevation="10">
    <v-img
      :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
      cover
      aspect-ratio="1"
      class="grey lighten-2 elevation-11"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <router-link
          class="text-decoration-none"
          :to="{ name: 'CharacterDetail', params: { id: character.id } }"
        >
          <h3>{{ character.name }}</h3>
        </router-link>
        <v-btn v-if="character.like" icon color="error" @click="selectCharacter">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn v-else icon color="secondary" @click="selectCharacter">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </div>
      <p>{{ character.modified | formatDate }}</p>
    </v-card-text>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    character: {
      type: Object
    }
  },
  methods: {
    selectCharacter() {
      this.$store.commit('characters/SET_LIKE_SELECT_CHARACTERS', this.character);
      
    }
  },

  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      return moment(val).format('YYYY');
    }
  }
};
</script>
