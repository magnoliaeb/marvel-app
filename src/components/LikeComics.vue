<template>
  <div class="">
      <v-container grid-list-md fluid>
          
      <h2 class="headline font-weight-black text-left" v-if="totalLikesComics <= 0">You don't have favorite comics</h2>

      <template v-else>
          <v-col cols="auto" class="d-flex justify-end">
          <v-subheader>{{ totalLikesComics }} all results</v-subheader>
        </v-col>

        <v-row >
               
            
      
        <v-col
          v-for="c in listsLikesComics"
          :key="c.id"
          class="d-flex child-flex"
          cols="6"
          md="4" lg="3"
        >
          <appComic :comic="c" />
        </v-col>
      </v-row>
      </template>
       
      </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appComic from '../components/Comic'
    export default {
       
        components: {
            appComic,
        },
        computed: {
            ...mapGetters('comics', ['listsLikesComics']),
            totalLikesComics() {
      return this.listsLikesComics.length
    }
        },
       
    }
</script>
