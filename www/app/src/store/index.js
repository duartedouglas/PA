import Firebase from './fb'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const api = Firebase.database().ref('produtos');

// const api = new Firebase('https://menorpreco.firebaseio.com')
const itemsCache = Object.create(null);
const store = new EventEmitter();
const storiesPerPage = store.storiesPerPage = 30;

let produtosIds = JSON.parse(sessionStorage.getItem('produtos')) || {};

export default store;

if(Object.keys(produtosIds).length == 0){
  api.on('value', snapshot => {
    produtosIds = snapshot.val();

    Object.keys(produtosIds).forEach(i => {
      produtosIds[i].checked = true;
      itemsCache[i] = produtosIds[i];
    });
    sessionStorage.setItem('produtos',JSON.stringify(itemsCache) );
    store.emit('produtos-updated', itemsCache);
  });
} else {
  Object.keys(produtosIds).forEach(i => {
    produtosIds[i].checked = true;
    itemsCache[i] = produtosIds[i];
  });
  sessionStorage.setItem('produtos',JSON.stringify(itemsCache) );
  store.emit('produtos-updated', itemsCache);
}


store.fetchProduto = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      resolve(itemsCache[id])
    } else {
      api.child('produtos/' + id).on('value', snapshot => {
        const story = itemsCache[id] = snapshot.val()
        resolve(story)
      }, reject)
    }
  })
};

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @return {Promise}
 */

store.fetchProdutos = ids => {
  if (!ids || !ids.length) {
    return Promise.resolve(produtosIds)
  } else {
     return Promise.all(ids.map(id => store.fetchProduto(id)));
     //return produtosIds
  }
}

/**
 * Fetch items for the given page.
 *
 * @param {Number} page
 * @return {Promise}
 */

store.fetchIProdutosByPage = page => {
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  const ids = produtosIds.slice(start, end)
  return store.fetchProdutos(ids)
}

/**
 * Fetch a user data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */

store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    api.child('user/' + id).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}
