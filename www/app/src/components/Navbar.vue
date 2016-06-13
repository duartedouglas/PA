<template>

    <header class="mdl-layout__header is-casting-shadow">

        <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">{{ title }}</span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
                    <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                    <input class="mdl-textfield__input" type="text" id="search">
                    <label class="mdl-textfield__label" for="search">pesquise produtos</label>
                </div>
            </div>
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
<style>
    body{
        /*background-color:#ff0000;*/
    }
</style>
<script>

    export default {
        name: 'Navbar',
        props:['title'],
        data(){
            return{

            }
        },
        ready(){
            console.info('header')
        }
    }
</script>