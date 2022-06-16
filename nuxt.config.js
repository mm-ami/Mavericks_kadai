export default {
  head: {
    title: 'memo',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  srcDir: 'src/',

  css: [
    { src: '~/assets/scss/common.scss' }
  ],

  styleResources: {
    scss: ['~/assets/scss/_variables.scss'],
  },

  plugins: [
    '@/plugins/vee-validate',
    {
      src: '@/plugins/vue-final-modal',
      mode: 'client'
    }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    'nuxt-fontawesome'
  ],

  fontawesome: {
    component: 'fa'
  },

  axios: {
    baseURL: '/server',
  },

  // Auth Moduleの設定
  auth: {
    redirect: {
      login: '/authentication/login',   // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: '/',  // ログアウト時のリダイレクトURL
      callback: false,   // Oauth認証等で必要となる コールバックルート
      home: '/loginAfter',         // ログイン後のリダイレクトURL
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/authentication/login', method: 'post', propertyName: 'token' },
          user: { url: '/authentication/user', method: 'get', propertyName: false},
          logout: false
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  },

  build: {
    transpile: ['vee-validate'],
    extend(config, ctx) {},
    loadingScreen: false,
  },

  // expressとの接続
  serverMiddleware: [
    {path: '/server', handler: '../server/index.js'}
  ]
}
