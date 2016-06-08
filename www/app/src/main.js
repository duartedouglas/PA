import Vue from 'vue'
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import Produtos from './components/Produtos.vue'
import ListaProdutos from './components/ListaProdutos.vue'
import Categoria from './components/Categorias.vue';

// install router
Vue.use(Router);

// // register filters globally
// Vue.filter('fromNow', fromNow)
// Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/': {
    component: App
  },
  '/produtos/': {
    component: Produtos
  },
  '/lista/': {
    component: ListaProdutos
  },
  '/categorias/': {
    component: Categoria
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
