<template>
  <div class="d-flex justify-center align-center" style="height:100vh; background: #f5f7fa">
    <v-card elevation="10" class="pa-6" width="400" shaped>
      <div class="text-center mb-4">
        <v-avatar size="56" color="primary" class="mb-2">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <h2 class="font-weight-bold">Welcome Back</h2>
        <p class="grey--text">Sign in to continue</p>
      </div>

      <!-- Username & Password -->
      <v-text-field
        label="Username"
        prepend-inner-icon="mdi-account"
        v-model="username"
        outlined
        dense
      />
      <v-text-field
        label="Password"
        type="password"
        prepend-inner-icon="mdi-lock"
        v-model="password"
        outlined
        dense
      />

      <v-btn color="primary" block large class="mt-2" @click="fakeLogin">
        Login
      </v-btn>

      <!-- OR separator -->
      <div class="my-4 text-center">
        <v-divider />
        <div class="overline my-2 grey--text">OR</div>
        <v-divider />
      </div>

      <!-- Social Login -->
      <v-btn color="red darken-1" dark block large class="mb-2" @click="loginWith('google')">
        <v-icon left>mdi-google</v-icon>
        Continue with Google
      </v-btn>
      <v-btn color="black" dark block large @click="loginWith('github')">
        <v-icon left>mdi-github</v-icon>
        Continue with GitHub
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginWith(provider) {
      this.$auth.loginWith(provider)
    },
    fakeLogin() {
      alert(`Username: ${this.username}\nPassword: ${this.password}\n(Please login with google or github)`)
    }
  }
}
</script>

<style scoped>
.overline {
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
