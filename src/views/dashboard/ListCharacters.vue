<template>
  <div>
    <v-container grid-list-md>
      <appHeroCharacters />

         

      <h3 class="title mt-6">MARVEL CHARACTERS LIST</h3>
      <v-row class="justify-space-between align-center d-flex">
        <v-col cols="7" class="d-flex align-center">
          <v-text-field
            name="query"
            label="Enter the name of the character"
            v-model.trim="query" append-icon="mdi-magnify"
            @keyup.enter="getCharactersByNameWithPaginate"
          ></v-text-field>
          


             <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="ml-3"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-filter-variant</v-icon>
            Filter by
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select filter by search</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 150px;">
          <v-radio-group
            v-model="selectFilter"
            column
          >
            <v-radio
              label="By title comic"
              value="comic"
            ></v-radio>
           
            <v-radio
              label="By name character"
              value="character"
            ></v-radio>
         
          
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="error darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="dialog = false"
          >
            Selected
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-col>
        <v-col cols="auto" class="text-right">
          <v-subheader>{{ total }} all results</v-subheader>
        </v-col>
      </v-row>
      <appLoading v-if="isLoading" />
      <v-subheader v-else-if="total <= 0">No results were found</v-subheader>
      <template v-else>

        <v-row>
          <!-- <pre>{{ characters }}</pre> -->
        <v-col
          v-for="c in characters"
          :key="c.id"
          class="d-flex child-flex"
          cols="6" md="4"
          lg="3"
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
              @input="getCharactersWithPaginate"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>

    </v-container>
  </div>
</template>

<script>
import serviceMarvel from "../../services/service-marvel";

import appHeroCharacters from "../../components/HeroCharacters";
import appCharacter from "../../components/Character";
import appLoading from "../../components/shared/Loading";
import { mapState } from 'vuex';
export default {
  components: {
    appCharacter,
    appHeroCharacters,
    appLoading
  },
  data() {
    return {
      query: null,
      isLoading: false,
      total: 0,
      paginas: 0,
      porPagina: 30,
      page: 1,
      selectFilter: 'character',
        dialog: false,
    };
  },
  computed: {
   
    ...mapState('characters', ['characters', 'likeCharacters'])
  },
 
  created() {
    this.getCharacters(null,this.porPagina, 0);
  },
  
  methods: {

    getCharacters(name,limit, offset) {
      this.isLoading = true;
      serviceMarvel.getCharacters(name, limit, offset).then(data => {
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
        
               
      
        this.isLoading = false;
      });
    },
    getCharactersWithPaginate() {
      const name = this.query
      const limit = this.porPagina;
      const offset = this.porPagina * (this.page - 1);
      this.getCharacters(name, limit, offset)
      
    },

    async getCharactersByNameWithPaginate() {
      this.page = 1
      if (this.selectFilter === 'character') {
      this.getCharactersWithPaginate()
        
      } else {
        console.log('comic')
        const data = await serviceMarvel.getComicByTitle(this.query)
        const {id } = data.results[0]
        // console.log(id)
        const dataResul = await serviceMarvel.getCharactersByIdComic(id)
        console.log(dataResul)

        
      }
       
    }
  }
};
</script>
