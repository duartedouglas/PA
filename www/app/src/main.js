import Vue from 'vue'
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import lazyload from 'vue-lazyload'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Produtos from './components/Produtos.vue'
import ListaProdutos from './components/ListaProdutos.vue'
import Categoria from './components/Categorias.vue';
import Login from './components/Login.vue';

// install router
Vue.use(Router);
Vue.use(lazyload, {
  loading: 'static/images/light_blue_material_design_loading.gif',
  try: 3 // default 1
});
// // register filters globally
// Vue.filter('fromNow', fromNow)
// Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/': {
    component: Home,
    'subRoutes':{
      '/lista/:lista': {
        component: ListaProdutos
      }
    }
  },
  '/produtos/': {
    component: Produtos
  },
  '/lista/:lista': {
    component: ListaProdutos
  },
  '/login/': {
    component: Login
  },
  '/categorias/': {
    component: Categoria,
    'subRoutes':{
      '/produtos/:id':{
        component:Produtos
      }
    }
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
