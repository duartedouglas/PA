<template>

    <div class="mdl-grid">
        <!-- MDL Spinner Component -->
        <div v-if="produtos.length ==0" class="mdl-spinner mdl-js-spinner is-active"></div>
        <ul class="mdl-list">
            <!--{{produtos | json}}-->
            <li v-for="p in produtos" class="mdl-list__item mdl-color--white">
                <span class="mdl-list__item-primary-content">
                    <img v-lazy="p.thumbnail.formats[0].formats.url" alt="" class="mdl-list__item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{p.productname}}
                </span>
                <span class="mdl-list__item-secondary-content">
                    <!--<span class="mdl-list__item-secondary-info">add</span>-->
                    <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
                </span>
            </li>
        </ul>
        <a  class="cicle-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons" role="presentation">add</i>
        </a>
    </div>

</template>
<style scoped>
    ul.mdl-list{
        width: 100%;
    }
    li.mdl-list__item.mdl-color--white {
        margin-bottom: 14px;
        line-height: inherit;
    }
</style>
<script>
    import store from '../store'
    export default{
        name:"produtos",
        data(){
            return {
                produtos:[]
            }
        },
        ready (){

            if (this.produtos.length == 0) {

                    this.produtos = store.fetchProdutos(['']);

            }
        },
//        created () {
//            store.on('produtos-updated', this.update)
//        },

        destroyed () {
            store.removeListener('topstories-updated', this.update)
        },

        methods: {
            update () {
                store.fetchIProdutos([]).then(items => {
                    this.items = items
            })
            }
        },
    }
</script>