import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.indigo.darken3,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
})

export default vuetify
