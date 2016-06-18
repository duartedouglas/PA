import Firebase from './fb';
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';

const api = Firebase.database().ref();
const produtosCache = {};
const lista = {};

let produtosIds = [];

export default lista;

//api.child('produtos').on('value', snapshot => {
//    produtosIds = snapshot.val();
//    store.emit('produtos-updated');
//})

lista.fetchProduto = (id, qtd) => {
    return new Promise((resolve, reject) => {
        if (produtosCache[id]) {
            resolve(produtosCache[id])
        } else {
            api.child('produtos/' + id).once('value', snapshot => {
                produtosCache[id] = snapshot.val();
                produtosCache[id].qtd = qtd;
                const story = produtosCache[id];
                resolve(story);
            }, reject);
        }
    })
};

lista.fetchListaProdutos = id => {
    return new Promise((resolve, reject) => {

        api.child('users/douglas/listas').once('value', snapshot => {
            let ids = snapshot.val();

            resolve( lista.fetchProdutos(Object.keys(ids), ids ));
        }, reject);
    })
};

lista.fetchProdutos = (ids, itens) => {
    if (!ids || !ids.length) {
        return Promise.resolve(produtosIds)
    } else {
        return Promise.all(ids.map(id => lista.fetchProduto(id, itens[id])))
      //  return produtosIds
    }
};
