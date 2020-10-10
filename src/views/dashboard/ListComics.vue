<template>
  <div>
    <v-container grid-list-md>

      <h3 class="title mt-6">MARVEL COMICS LIST</h3>
      <v-row class="justify-space-between align-center d-flex">
        <v-col cols="7" class="d-flex align-center">
          <v-text-field
            name="query"
            label="Enter the title of the comic"
            v-model.trim="query"
            append-icon="mdi-magnify"
            @keyup.enter="getComicsByNameWithPaginate"
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
        <v-card-title>Select Issue number</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 350px;">
          <v-radio-group
            v-model="selectIssueNumber"
            column
          >
            <v-radio v-for="i in [0,1,2,3,4]" :key="i"
              :label="`Issue number ${i}`"
              :value="i"
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
            @click="getComicsByFormatWitIssueNumber"
          >
            Select
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-col>
        <v-col cols="auto" class="text-right">
          <v-subheader>{{ total }} all results</v-subheader>
        </v-col>
      </v-row>

      <v-tabs color="primary" right v-model="activateTab">
        <v-tab v-for="(f, i) in formats" :key="i" @click="getComicsByFormatWithPaginate(f.value)">{{ f.name }}</v-tab>

        <v-tab-item v-for="(f, i) in formats" :key="i">
          <v-container fluid>
            <appLoading v-if="isLoading" />
      <v-subheader v-else-if="total <= 0">No results were found</v-subheader>
      <template v-else>
        <v-row>
          <v-col v-for="c in comics" :key="c.id" class="d-flex child-flex" cols="6" md="4" lg="3">
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
              @input="getComicsWithPaginate"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
          </v-container>
        </v-tab-item>
      </v-tabs>

      
    </v-container>
  </div>
</template>

<script>
import serviceMarvel from "../../services/service-marvel";

import appComic from "../../components/Comic";
import appLoading from "../../components/shared/Loading";
import { mapState } from "vuex";
export default {
  components: {
    appComic,
    appLoading
  },
  data() {
    return {
      selectIssueNumber: null,
        dialog: false,
      activateTab: 0,
      query: null,
      active: null,
      formats: [
        { name: 'all', value: null },
        { name: 'hardcover', value: 'hardcover' },
        { name: 'comic', value: 'comic' },
        { name: 'trade paperback', value: 'trade paperback' }
      ],
      formatSelect: null,
      isLoading: false,
      total: 0,
      paginas: 0,
      porPagina: 30,
      page: 1
    };
  },
  computed: {
    ...mapState('comics', ['comics', 'likeComics'])
  },

  created() {
    this.getComics(null, null, null, this.porPagina, 0);
  },

  methods: {
    getComics(title, format, issueNumber, limit, offset) {
      this.isLoading = true;
      serviceMarvel.getComics(title, format, issueNumber, limit, offset).then(data => {
        this.total = data.total;
        this.paginas = Math.ceil(this.total / this.porPagina);

        const comicsResults = data.results;

        let comics = [];
        if (this.likeComics.length > 0) {
          comics = comicsResults.map((ch, index) => {
            const like = this.likeComics.some(cStore => {
              return ch.id == cStore.id ? true : false;
            });
            return { index, ...ch, like };
          });
        } else {
          comics = comicsResults.map((character, index) => {
            return {
              index,
              like: false,
              ...character
            };
          });
        }
        console.log(comics)

        this.$store.commit('comics/SET_COMICS', comics);

        this.isLoading = false;
      });
    },
    getComicsWithPaginate() {
      const title = this.query;
      const format = this.formatSelect;
      const limit = this.porPagina;
      const offset = this.porPagina * (this.page - 1);
      const issueNumber = this.selectIssueNumber
      this.getComics(title, format, issueNumber, limit, offset);
    },

    getComicsByNameWithPaginate() {
      this.page = 1;
      this.activateTab = 0;
      this.formatSelect = null;
      this.getComicsWithPaginate();
    },

    getComicsByFormatWithPaginate(format) {
      this.formatSelect = format
      this.query = null
      this.page = 1;
      this.getComicsWithPaginate();
    },
    getComicsByFormatWitIssueNumber() {
      this.query = null
      this.activateTab = 0
      this.page = 1;
      this.getComicsWithPaginate();
      this.dialog = false
    }
  }
};
</script>
