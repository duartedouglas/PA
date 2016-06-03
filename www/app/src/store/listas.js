import Firebase from 'firebase'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const api = new Firebase('https://menorpreco.firebaseio.com')
const produtosCache = {};
const lista = {};

let produtosIds = [];

export default lista

//api.child('produtos').on('value', snapshot => {
//    produtosIds = snapshot.val();
//    store.emit('produtos-updated');
//})

lista.fetchProduto = id => {
    return new Promise((resolve, reject) => {
        if (produtosCache[id]) {
            resolve(produtosCache[id])
        } else {
            api.child('produtos/' + id).once('value', snapshot => {
                const story = produtosCache[id] = snapshot.val();
                resolve(story)
            }, reject)
        }
    })
};

lista.fetchListaProdutos = id => {
    return new Promise((resolve, reject) => {

        api.child('users/douglas/listas').once('value', snapshot => {
            let ids = snapshot.val();
            resolve( lista.fetchProdutos(Object.keys(ids) ));
        }, reject);
    })
};

lista.fetchProdutos = ids => {
    if (!ids || !ids.length) {
        return Promise.resolve(produtosIds)
    } else {
        return Promise.all(ids.map(id => lista.fetchProduto(id)))
      //  return produtosIds
    }
};
