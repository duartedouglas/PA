import Firebase from './fb';
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';

const api = Firebase.database().ref();

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