<template>
  <div tile flat elevation="10">
    <v-img
      :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
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
          :to="{ name: 'ComicDetail', params: { id: comic.id } }"
        >
          <h3>{{ comic.title }}</h3>
        </router-link>
        <v-btn v-if="comic.like" icon color="error" @click="selectComic">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn v-else icon color="secondary" @click="selectComic">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </div>
      <v-list-item>
        <v-list-item-icon>
          <v-img
            :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
            cover
            aspect-ratio="1"
            class="grey lighten-2"
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
        </v-list-item-icon>
        <v-list-item-content>
          <p>{{ comic.description | trimLength }}</p>
          <p>{{ comic.format }}</p>
          <p>{{ comic.modified | formatDate }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    comic: {
      type: Object
    }
  },
  methods: {
    selectComic() {
      this.$store.commit('comics/SET_LIKE_SELECT_COMICS', this.comic);
      
    }
  },
  filters: {
     formatDate(val) {
      if (!val) {
        return "-";
      }

      return moment(val).format('YYYY');
    },
    trimLength(val) {
      if (!val) {
        return 'Not data';
      }
      if (val.length < 40) {
        return val;
      }
      return `${val.substring(0, 40)}...`;
    }
  }
};
</script>
