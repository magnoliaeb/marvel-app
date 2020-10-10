<template>
  <div class="fill-height d-flex">
        <appAlert v-if="showAlert" :info="infoAlert" />

    <v-row class="justify-center align-center">
      <v-col md="6" lg="5">
        <v-card flat>
          <v-form @submit.prevent="resetPassword" ref="form" v-model="isValid" lazy-validation>
            <v-card-title primary-title class="d-block">
              <h2 class="text-xl-h4 mb-2">Reset password</h2>
            <p class="grey--text pb-0  body-1">Enter your email address to reset your password instruction</p>

            </v-card-title>
            <v-card-text>
              <v-row class="justify-space-between align-center">
               
                <v-col cols="12" class="py-0">
                  <v-text-field
                    outlined
                    v-model.trim="email"
                    name="email"
                    label="Email"
                     autocomplete="email"
                    placeholder="you@email.com"
                    type="text"
                    autofocus
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
               
               
              </v-row>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-col>
                  <v-btn block color="primary" type="submit" depressed large :loading="isLoaing" :disabled="!isValid">
                <span class="text-capitalize">Reset password</span>
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
              </v-col>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { auth } from '../fb/index'
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
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],


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
    async resetPassword() {
        if (this.$refs.form.validate()) {
            this.isLoaing = true
            try {
              await auth.sendPasswordResetEmail(this.email)
              this.infoAlert.error = false;
         this.infoAlert.message = 'Help is on the way! We send you an email with a login link and instructions on how to reset your password.';
         this.showAlert = true;
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
