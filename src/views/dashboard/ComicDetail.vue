<template>
  <div class>
      <v-container grid-list-md>

          <appLoading v-if="isLoading" />
        <template v-else>
          <v-row class="justify-space-around d-flex pt-4">
          <v-col cols="12" lg="6" class>
            <v-img
              height="400"
              :src="`${comic.images[0].path}.${comic.images[0].extension}`"
              cover
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" lg="6" class>
            <h2>{{ comic.title }}</h2>
            <p class="mt-4">{{ comic.description | trimLength }}</p>
            <h3 class="display-1 font-weight-black">
              {{ comic.prices[0].price }}
              <span>$</span>
            </h3>
            <v-chip :ripple="false" class="my-2">{{ comic.format }}</v-chip>
            <div class="mt-0 pt-0 d-flex">
              <p class="caption mr-4">
                <span class="text-uppercase">isbn</span>
                : {{ comic.isbn }}
              </p>
              <span class="caption font-weight-bold">Published: {{ comic.dates[0].date }}</span>
            </div>
          </v-col>
        </v-row>

        <v-row class="justify-center d-flex mt-8">
          <v-tabs v-model="activeTab">
            <v-tab
              v-for="tab in tabs"
              :key="tab.id"
              :to="{ name: tab.redirecTo, params: { id: comic.id} }"
            >{{ tab.name }}</v-tab>
          </v-tabs>
          <v-col cols="12">
          <router-view  />
          </v-col>
        </v-row>
        </template>

      </v-container>
  </div>
</template>

<script>
import appLoading from '../../components/shared/Loading'
import serviceMarvel from '../../services/service-marvel'
export default {
  components: {
    appLoading,
  },
  data() {
    return {
      isLoading: true,
        id:null,
        comic: null,
    activeTab: 1,
      tabs: [
        { id: '1', name: 'Characters', redirecTo: 'CharactersByComic' },
        { id: '2', name: 'Stories', redirecTo: 'StoriesByComic' }
      ],
    };
  },
 
  created() {
      const id = this.$route.params.id
      this.id = id
    this.getComicById();
  },
  filters: {
    trimLength(val) {
      if (!val) {
        return 'Not Available';
      }
      if (val.length < 120) {
        return val;
      }
      return `${val.substring(0, 120)}...`;
    }
  },
  methods: {
   
    getComicById() {
      const { id } = this.$route.params;
      this.isLoading = true
      serviceMarvel.getComicById(id).then((data) => {
        console.log(data.results)
        this.comic = data.results[0]
        this.isLoading = false
      })

      
    }
  }
};
</script>
