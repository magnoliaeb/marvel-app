t<template>
  <div class="fill-height d-flex">
        <appAlert v-if="showAlert" :info="infoAlert" />
    <v-row class="justify-center align-center">
      <v-col md="6" lg="5">
        <v-card flat>
          <v-form
            @submit.prevent="registerUser"
            ref="form"
            v-model="isValid"
            lazy-validation
          >
            <v-card-title primary-title class="d-block">
        
              <h2 class="text-xl-h4 text-center mt-3">Registration</h2>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-row class="justify-space-between align-center">
               
                <v-col cols="12">
                  <div class="text-center">
                    <span
                      class="text-uppercase font-weight-bold line grey--text"
                      >register with email</span
                    >
                  </div>
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    outlined
                    label="Name"
                    name="name"
                    autocomplete="given-name"
                    v-model="credencials.name"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    outlined
                    label="Last name"
                    name="lastname"
                    autocomplete="family-name"
                    v-model="credencials.lastname"
                    :rules="lastnameRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-text-field
                    outlined
                    v-model="credencials.email"
                    name="email"
                    label="Email"
                    autocomplete="email"
                    placeholder="you@email.com"
                    type="text"
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    outlined
                    v-model="credencials.password"
                    type="password"
                    name="email"
                    label="password"
                    :rules="passwordRules"
                    @keyup.enter="registerUser"
                  ></v-text-field>
                </v-col>
                <v-col class="pt-0">
                  <v-checkbox
                    v-model="credencials.isAgree"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="I agree to the Marvel Tearms"
                    required
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="pt-0 d-block">
              <v-col>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  depressed
                  large
                  :disabled="!isValid"
                  :loading="isLoaing"
                >
                  <span class="text-capitalize">Log up</span>
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
                <v-divider class="my-6"></v-divider>
                <p class="text-center grey--text text--darken-2">
                  Already have an Account?
                  <router-link :to="{ name: 'SignIn' }" class="primary--text"
                    >Sing In</router-link
                  >
                </p>
              </v-col>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import appAlert from '../components/Alert'
export default {
  data() {
    return {
        isLoaing: false,
      isValid: true,
      showAlert: false,
      infoAlert: {
        error: null,
        message: ''
      },
      credencials: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        isAgree: false
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      lastnameRules: [
        v => !!v || 'Lastame is required',
        v => (v && v.length <= 20) || 'Lastname must be less than 20 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must have 5+ characters',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
      ]
    };
  },
  components: {
    appAlert,
  },
    watch: {
    showAlert() {
      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert = !this.showAlert;
        }, 3000);
      }
    }
  },
  methods: {
   
    async registerUser() {
      if (this.$refs.form.validate()) {
        this.isLoaing = true;
        try {
          await this.$store.dispatch('registerUser', this.credencials)
          this.$router.push({ name: 'Dashboard'})
        } catch (error) {
          this.infoAlert.error = true;
          this.infoAlert.message = error.message;
          this.showAlert = true;
        } finally {
          this.isLoaing = false

        }
      }
    }
  }
};
</script>
