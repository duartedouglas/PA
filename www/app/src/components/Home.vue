<template>
<main class="mdl-layout__content mdl-color--grey-100">
    <search-box></search-box>
    <div class="mdl-color--white">
        <div class="flex center wrap">
            <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
               {{ listas | json}}
                <div v-link="{ path: '/lista/supermercado' }" class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
                    <div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
                        <h2 class="mdl-card__title-text">Supermercado</h2>
                    </div>
                    <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                        preços
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Ver no Mapa</a>
                    </div>
                </div>
                <div class="demo-separator mdl-cell--1-col"></div>
                <mdl-textfield id="expandable-button" type="number" expandable="search1"></mdl-textfield>
                <!--<div class="demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">-->
                <!--<div class="mdl-card__supporting-text mdl-color-text--blue-grey-50">-->
                <!--<h3>View options</h3>-->
                <!--<ul>-->
                <!--<li>-->
                <!--<label for="chkbox1" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">-->
                <!--<input type="checkbox" id="chkbox1" class="mdl-checkbox__input">-->
                <!--<span class="mdl-checkbox__label">Click per object</span>-->
                <!--</label>-->
                <!--</li>-->
                <!--<li>-->
                <!--<label for="chkbox2" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">-->
                <!--<input type="checkbox" id="chkbox2" class="mdl-checkbox__input">-->
                <!--<span class="mdl-checkbox__label">Views per object</span>-->
                <!--</label>-->
                <!--</li>-->
                <!--<li>-->
                <!--<label for="chkbox3" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">-->
                <!--<input type="checkbox" id="chkbox3" class="mdl-checkbox__input">-->
                <!--<span class="mdl-checkbox__label">Objects selected</span>-->
                <!--</label>-->
                <!--</li>-->
                <!--<li>-->
                <!--<label for="chkbox4" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">-->
                <!--<input type="checkbox" id="chkbox4" class="mdl-checkbox__input">-->
                <!--<span class="mdl-checkbox__label">Objects viewed</span>-->
                <!--</label>-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
                <!--<div class="mdl-card__actions mdl-card--border">-->
                <!--<a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50">Change location</a>-->
                <!--<div class="mdl-layout-spacer"></div>-->
                <!--<i class="material-icons">location_on</i>-->
                <!--</div>-->
                <!--</div>-->

            </div>
        </div>

        <mdl-dialog v-ref:criarLista title="Criar Lista">
            <p>
                Digite um nome para a lista
            </p>
            <mdl-textfield label="Supermercado..." :value.sync="nomeLista"></mdl-textfield>

            <template slot="actions">

                <mdl-button primary @click="salvaLista" >Ok</mdl-button>
                <mdl-button @click="cancelar">Cancelar</mdl-button>
            </template>
        </mdl-dialog>

        <button @click="criarLista" class="circle-button  mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">add</i>
        </button>

    </div>
</main>
</template>
<style>

</style>
<script>
    import SearchBox from './SearchBox.vue';
    import Firebase from '../store/fb';

    export default{
        name:'Home',
        data(){
            return {
                title:'Menor Preço',
                nomeLista:'',
            }
        },
        created(){

        },
        components: {
            SearchBox
        },
        ready(){
            this.$parent.title = this.title;
            this.$parent.headerVisible = true;

            let uid = localStorage.getItem('userUID');
            if(uid){
                Firebase.database().ref('users/'+uid+'/listas').on('value', snap =>{
                    this.listas = snap.val();
                })
            }
        },
        methods: {
            criarLista() {
                this.$refs.criarlista.open();
            },
            cancelar() {

                this.$refs.criarlista.close();
            },
            salvaLista() {
                if (this.nomeLista.length == 0) {
                    return false;
                }
                let uid = localStorage.getItem('userUID');
                if(uid){

                    Firebase.database().ref('users/'+uid+'/listas').set(this.nomeLista);
                    this.$router.go('/lista/'+this.nomeLista)
                }
                this.$refs.criarlista.close();
            }
        }
    }
</script>