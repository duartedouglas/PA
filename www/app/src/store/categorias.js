import Firebase from 'firebase'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const api = new Firebase('https://menorpreco.firebaseio.com')

const categoria = {};

let categoriasIds = [];

export default categoria

categoria.fetchCategorias = (id) => {
    return new Promise((resolve, reject) => {

        api.child('categoria').on('value', snapshot => {
            let categorias = snapshot.val();
         
            resolve( categorias );
        }, reject);
    });
};