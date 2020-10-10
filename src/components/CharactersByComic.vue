<template>
  <div class="">
      <v-container grid-list-md >
            <appLoading v-if="isLoading" />
      <v-subheader v-else-if="total <= 0">No results were found</v-subheader>

        <template v-else>
          <v-row class="d-flex justify-start">
      
        <v-col
          v-for="c in characters"
          :key="c.id"
          class="d-flex child-flex"
          cols="12"
          md="6" lg="4"
        >
          <appCharacter :character="c" />
        </v-col>
      </v-row>
       <v-row class="d-flex justify-center">

          <v-col cols="6">
            <v-pagination
              v-model="page"
              circle
              class="my-4"
              :length="paginas"
              @input="getCharactersByComicWithPaginate"
            ></v-pagination>
          </v-col>
        </v-row>
        </template>
       
      </v-container>
  </div>
</template>

<script>
import appCharacter from '../components/Character'
import appLoading from '../components/shared/Loading'
import serviceMarvel from '../services/service-marvel'

import { mapState } from 'vuex';

export default {
  components: {
    appCharacter,
    appLoading
  },
  data() {
    return {
      id: null,
      isLoading: false,
      total: 0,
      paginas: 0,
      porPagina: 5,
      page: 1,
    };
  },
 
  computed: {
   
    ...mapState('characters', ['characters', 'likeCharacters'])
  },
 
  created() {
      this.id = this.$route.params.id
    this.getCharactersByComic(this.id,this.porPagina, 0);
  },
  
  methods: {

    getCharactersByComic(id, limit, offset) {
      this.isLoading = true;
      serviceMarvel.getCharactersByComic(id, limit, offset).then(data => {
        this.total = data.total;
        this.paginas = Math.ceil(this.total / this.porPagina);

        const charactersResults = data.results;

        let characters = []
    if (this.likeCharacters.length > 0 ) {
       characters = charactersResults.map((ch, index) => {
      const like = this.likeCharacters.some((cStore) => {
         return ch.id == cStore.id ? true: false 
      })
        return { index, ...ch, like}
    })
    } else {
      characters = charactersResults.map((character, index) => {
          return {
            index,
            like: false,
            ...character
          }
        })
      }
                  this.$store.commit('characters/SET_CHARACTERS', characters);

        // console.log(charactersResults)
        
               
      
        this.isLoading = false;
      });
    },
    getCharactersByComicWithPaginate() {
      const limit = this.porPagina;
      const offset = this.porPagina * (this.page - 1);
      this.getCharactersByComic(this.id, limit, offset)
      
    },

    
  }
};
</script>

