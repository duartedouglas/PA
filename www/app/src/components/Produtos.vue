
<template>

    <div class="mdl-color--white">
        <div class="mdl-grid">
            <!-- MDL Spinner Component -->
            <mdl-spinner :active="produtos.length ==0"></mdl-spinner>

            <div class="label">Adicionar aos Favoritos</div>

            <ul class="mdl-list ">

                <li v-for="p in produtos" class="mdl-list__item mdl-color--white">

                    <span class="mdl-list__item-primary-content">
                        <img :src="p.thumbnail.formats[0].formats.url" alt="" class="mdl-list-item-avatar">
                        <!--<i class="material-icons ">person</i>-->
                        {{p.productname}}
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <span class="mdl-list__item-secondary-info preco">
                            {{p.preco || 'indisponivel'}}

                            <mdl-switch :checked.sync="favoritos" :value="p.id"></mdl-switch>

                        </span>
                    </span>
                </li>
            </ul>
        </div>
       <!--  <button  class="circle-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">add</i>
        </button> -->
    </div>

</template>

<style scoped>
    .label,
    .preco{
        font-size: 16px!important;
        color: rgb(63,81,181)!important;
        font-weight: 500!important;
    }
    ul.mdl-list{
        width: 100%;
    }
    li.mdl-list__item.mdl-color--white {
        padding: 10px;
        margin-bottom: 0;
        line-height: inherit;
        box-shadow: #757575 0.3px 0.3px 0.1px 0.3px;
    }
    .mdl-list-item-avatar, .mdl-list__item-avatar.material-icons {
        height: 60px;
        width: 60px;
        box-sizing: border-box;
        background-color: #757575;
        font-size: 40px;
        color: #fff;
        margin: 0 5px 0 0;
        box-shadow: #757575 0.2px 0.4px 0.1px 0.1px;
    }
    .list-radio {
        display: inline;
    }
</style>
<script>

    import store from '../store';

    export default{
        name:"produtos",
        data(){
            return {
                produtos:{},
                countProdutos: 0,
                favoritos:[]
            }
        },
//        created (){
//            if (this.produtos.length == 0) {
//                store.fetchProdutos(['']).then(p => {
//                    this.produtos = p;
//                    console.log(this.produtos)
//                });
//            }
//        },
        ready () {
            this.countProdutos = Object.keys(this.produtos).length;
            this.$parent.headerVisible = true;
            store.fetchProdutos([]).then(p => {
                this.produtos = p;
            });
            store.on('produtos-updated', this.update);
        },

        methods: {
            update (produtos) {
                this.produtos = produtos;
            }
        },
    }
</script>