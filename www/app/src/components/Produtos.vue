<template>


    <ul class="mdl-list">
        <!--{{produtos | json}}-->
        <li v-for="p in produtos" class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <img :src="p.thumbnail.formats[0].formats.url" alt="" class="mdl-list__item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{p.productname}}
                </span>
                <span class="mdl-list__item-secondary-content">
                    <!--<span class="mdl-list__item-secondary-info">add</span>-->
                    <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
                </span>
        </li>
    </ul>


</template>
<style>
/**/
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
        created(){

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