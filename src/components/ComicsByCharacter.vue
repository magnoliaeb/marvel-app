<template>
  <div class="">
  
      <v-container grid-list-md >
            <appLoading v-if="isLoading" />
      <v-subheader v-else-if="total <= 0">No results were found</v-subheader>

        <template v-else>
          <v-row class="d-flex justify-start">
      
        <v-col
          v-for="c in comics"
          :key="c.id"
          class="d-flex child-flex"
          cols="12"
          md="4" lg="3"
        >
          <appComic :comic="c" />
        </v-col>
      </v-row>
       <v-row class="d-flex justify-center">

          <v-col cols="6">
            <v-pagination
              v-model="page"
              circle
              class="my-4"
              :length="paginas"
              @input="getComicsByCharacterWithPaginate"
            ></v-pagination>
          </v-col>
        </v-row>
        </template>
       
      </v-container>
  </div>
</template>

<script>
import appComic from '../components/Comic'
import appLoading from '../components/shared/Loading'
import serviceMarvel from '../services/service-marvel'

import { mapState } from 'vuex';

export default {
  components: {
    appComic,
    appLoading
  },
  data() {
    return {
      id: null,
      isLoading: false,
      total: 0,
      paginas: 0,
      porPagina: 10,
      page: 1,
    };
  },
 
  computed: {
   
    ...mapState('comics', ['comics', 'likeComics'])
  },
 
  created() {
      this.id = this.$route.params.id
    this.getComicsByCharacter(this.id,this.porPagina, 0);
  },
  
  methods: {

    getComicsByCharacter(id, limit, offset) {
      this.isLoading = true;
      serviceMarvel.getComicsByCharacter(id, limit, offset).then(data => {
        this.total = data.total;
        this.paginas = Math.ceil(this.total / this.porPagina);

        const comicsResults = data.results;

        let comics = []
    if (this.likeComics.length > 0 ) {
       comics = comicsResults.map((ch, index) => {
      const like = this.likeComics.some((cStore) => {
         return ch.id == cStore.id ? true: false 
      })
        return { index, ...ch, like}
    })
    } else {
      comics = comicsResults.map((character, index) => {
          return {
            index,
            like: false,
            ...character
          }
        })
      }

      console.log(comics)
                  this.$store.commit('comics/SET_COMICS', comics);        
               
      
        this.isLoading = false;
      });
    },
    getComicsByCharacterWithPaginate() {
      const limit = this.porPagina;
      const offset = this.porPagina * (this.page - 1);
      this.getComicsByCharacter(this.id , limit, offset)
      
    },

    
  }
};
</script>
