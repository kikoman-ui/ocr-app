import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ocr-app',
    title: 'ocr-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
  redirect: {
    login: '/auth/login',         // not authenticated
    logout: '/auth/login',        // after logout
    callback: '/auth/callback',   // OAuth callback
    home: '/tesseract'       // after login success
  },
  autoFetchUser: true,
  strategies: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      scheme: 'oauth2',
      endpoints: {
        authorization: 'https://accounts.google.com/o/oauth2/auth',
        userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
      },
      token: {
        property: 'access_token',
        type: 'Bearer',
        maxAge: 1800
      },
      responseType: 'token id_token',
      scope: ['openid', 'profile', 'email'],
      redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback',
      codeChallengeMethod: ''
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // only needed for server-side flow (we’re doing client-side implicit)
      scheme: 'oauth2',
      endpoints: {
        authorization: 'https://github.com/login/oauth/authorize',
        userInfo: 'https://api.github.com/user'
      },
      token: {
        property: 'access_token',
        type: 'Bearer',
        maxAge: 1800
      },
      responseType: 'token',
      scope: ['read:user', 'user:email'],
      redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback',
      codeChallengeMethod: ''
    }
  }
},


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
