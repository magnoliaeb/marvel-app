<template>
    <div>
         <v-snackbar :color="selectColor"
      v-model="snackbar"
      :vertical="vertical"
    >
      {{ info.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
        dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    </div>
</template>

<script>
    export default {
        props: ['info'],
        data() {
            return {
                 snackbar: true,
                 vertical: true,
            }
        },
        computed: {
            selectColor() {
                return this.info.error ? 'error': 'success' 
            }
        },
    }
</script>
