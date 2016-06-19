<template>

    <header class="mdl-layout__header is-casting-shadow" v-show="visible">

        <div class="mdl-layout__header-row">
            <span class="mdl-layout-title"  v-show="!inputFocus">{{ title }}</span>
            <div class="mdl-layout-spacer"></div>

            <mdl-textfield id="demo-expandable-button" expandable="search"></mdl-textfield>

            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
                <li class="mdl-menu__item">Sobre</li>
                <li class="mdl-menu__item">Configurações</li>
                <li class="mdl-menu__item">Termos de uso</li>
            </ul>
        </div>

        <!-- Tabs -->
        <!--<div class="mdl-layout__tab-bar mdl-js-ripple-effect">-->
            <!--<a href="#fixed-tab-1" class="mdl-layout__tab is-active">Tab 1</a>-->
            <!--<a href="#fixed-tab-2" class="mdl-layout__tab">Tab 2</a>-->
            <!--<a href="#fixed-tab-3" class="mdl-layout__tab">Tab 3</a>-->
        <!--</div>-->
    </header>

</template>
<style scoped>

</style>
<script>

    export default {
        name: 'Navbar',
        props:['title', 'visible'],
        data(){
            return{
                inputFocus:false
            }
        },
        ready(){

        },
        methods:{
            focusIn(){
                this.inputFocus = !this.inputFocus;
            }
        }

    }
</script>