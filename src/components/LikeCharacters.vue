<template>
  <div class="">
      <v-container grid-list-md fluid>
          
      <h2 class="headline font-weight-black text-left" v-if="totalLikesComics <= 0">You don't have favorite characters</h2>

      <template v-else>
          <v-col cols="auto" class="d-flex justify-end">
          <v-subheader>{{ totalLikesComics }} all results</v-subheader>
        </v-col>

        <v-row >
               
            
      
        <v-col
          v-for="c in listsLikesCharacters"
          :key="c.id"
          class="d-flex child-flex"
          cols="6"
          md="4" lg="3"
        >
          <appCharacter :character="c" />
        </v-col>
      </v-row>
      </template>
       
      </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appCharacter from '../components/Character'
    export default {
                
        components: {
            appCharacter,
        },
        computed: {
            ...mapGetters('characters', ['listsLikesCharacters']),
            totalLikesComics() {
      return this.listsLikesCharacters.length
    }
        },
       
    }
</script>

