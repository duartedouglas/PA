<template>
    <div class="mdl-color--white">
        <div class="mdl-grid">
            <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
                <div  v-link="{ path: '/lista/supermercado' }" class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
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

                <dialog class="mdl-dialog">
                    <div class="mdl-dialog__content">
                        <p>
                            Digite um nome para a lista
                        </p>
                        <form action="#">
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" v-model="nomeLista" type="text" id="nomeLista">
                                <label class="mdl-textfield__label"  for="nomeLista">Supermercado...</label>
                            </div>
                        </form>
                    </div>
                    <div class="mdl-dialog__actions ">
                        <button @click="salvaLista" type="button" class="mdl-button">Ok</button>
                        <button @click="cancelar" type="button" class="mdl-button close">Cancelar</button>
                    </div>
                </dialog>


            </div>
        </div>

        <a @click="criarLista" class="circle-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons" role="presentation">add</i>
        </a>
    </div>
</template>
<style>

</style>
<script>
    import Navbar from './Navbar.vue'
    import Sidebar from './Sidebar.vue'
    export default{
        name:'Home',
        data(){
            return {
                nomeLista:'',
                dialog:null
            }
        },
        components: {
            Navbar,
            Sidebar,
        },
        created(){
            this.$parent.title = 'MenorPreço';
        },
        ready(){

            this.dialog = document.querySelector('dialog');
        },
        methods: {
            criarLista() {

                if (! this.dialog.showModal) {
                    dialogPolyfill.registerDialog(dialog);
                }
                this.dialog.showModal();
            },
            cancelar() {

                this.dialog.close();
            },
            salvaLista() {
                this.dialog.close();
            }
        }
    }
</script>