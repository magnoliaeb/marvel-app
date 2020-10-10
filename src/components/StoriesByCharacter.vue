<template>
  <div class="">
      <v-container grid-list-md >
            <appLoading v-if="isLoading" />
      <v-subheader v-else-if="total <= 0">No results were found</v-subheader>

        <template v-else>
          <v-row class="d-flex justify-start">
      
      

          <v-expansion-panels>
    <v-expansion-panel
       v-for="s in stories"
          :key="s.id"
    >
      <v-expansion-panel-header>
        <h4>{{ s.title }}</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <p>{{ s.modified | formatDate }}</p>
       <p>{{ s.description | trimLength }}</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
      </v-row>
      
        </template>
       
      </v-container>
  </div>
</template>

<script>
import appLoading from '../components/shared/Loading'
import serviceMarvel from '../services/service-marvel'
import moment from 'moment';

export default {
  components: {
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
      stories: []
    };
  },
 
   filters: {
     formatDate(val) {
      if (!val) {
        return '-';
      }

      return moment(val).format('YYYY');
    },
    trimLength(val) {
      if (!val) {
        return 'Not data';
      }
      if (val.length < 600) {
        return val;
      }
      return `${val.substring(0, 600)}...`;
    }
  },
  created() {
      this.id = this.$route.params.id
    this.getStoriesByCharacter(this.id,this.porPagina, 0);
  },
  
  methods: {

    getStoriesByCharacter(id, limit, offset) {
      this.isLoading = true;
      serviceMarvel.getStoriesByCharacter(id, limit, offset).then(data => {
        this.total = data.total;
        this.paginas = Math.ceil(this.total / this.porPagina);

        const storiesResults = data.results;

      const stories = storiesResults.map((story, index) => {
          return {
            index,
            like: false,
            ...story
          }
        })
        this.stories = stories
      
        
               
      
        this.isLoading = false;
      });
    },
    

    
  }
};
</script>
