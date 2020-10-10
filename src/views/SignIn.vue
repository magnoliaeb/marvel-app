<template>
  <div class="fill-height d-flex">
    <appAlert v-if="showAlert" :info="infoAlert" />
    <v-row class="justify-center align-center">
      <v-col md="6" lg="5">
        <v-card flat>
          <v-form
            @submit.prevent="loginUser"
            ref="form"
            v-model="isValid"
            lazy-validation
          >
            <v-card-title primary-title class="d-block">
              <h2 class="text-xl-h4 text-center mt-3">Welcome Back</h2>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-row class="justify-space-between align-center">
                <v-col cols="12">
                  <div class="text-center">
                    <span
                      class="text-uppercase font-weight-bold line grey--text"
                      >login with email</span
                    >
                  </div>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    outlined
                    v-model.trim="credencials.email"
                    name="email"
                    label="Email"
                    autocomplete="email"
                    placeholder="you@email.com"
                    type="text"
                    autofocus
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    outlined
                    v-model.trim="credencials.password"
                    :type="canSeePassword ? 'text' : 'password'"
                    name="email"
                    label="password"
                    autocomplete="current-password"
                    :append-icon="canSeePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="canSeePassword = !canSeePassword"
                    :rules="passwordRules"
                    @keyup.enter="loginUser"
                  ></v-text-field>
                </v-col>
                <v-col class="py-0" md="6">
                  
                </v-col>
                <v-col class="py-0 text-right" md="4">
                  <router-link :to="{ name: 'ForgotPassword' }"
                    >Forgot password</router-link
                  >
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="pt-0 d-block">
              <v-col>
                <v-btn
                  block
                  color="primary"
                  type="submit"
                  depressed
                  large
                  :loading="isLoaing"
                  :disabled="!isValid"
                >
                  <span class="text-capitalize">Log In</span>
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
                <v-divider class="my-6"></v-divider>
                <p class="text-center grey--text text--darken-2">
                  Don't have an account yet?
                  <router-link :to="{ name: 'SignUp' }" class="primary--text"
                    >Sing Up</router-link
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
import appAlert from "../components/Alert";
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
      canSeePassword: false,
      credencials: {
        email: '',
        password: '',
        isLogged: false
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password es requerido']
    };
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
  components: {
    appAlert
  },
  methods: {
    async loginUser() {
      if (this.$refs.form.validate()) {
        this.isLoaing = true;
        try {
          await this.$store.dispatch('loginUser', this.credencials);
          this.$router.push({ name: 'Dashboard' });
        } catch (error) {
          this.infoAlert.error = true;
          this.infoAlert.message = error.message;
          this.showAlert = true;
        } finally {
          this.isLoaing = false;

        }
      }
    }
  }
};
</script>