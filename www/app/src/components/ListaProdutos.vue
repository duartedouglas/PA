<template>
    <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mg-grid">
            <!-- MDL Spinner Component -->
             <mdl-spinner :active="produtos.length ==0"></mdl-spinner>
            <ul class="mdl-list">
                <!--{{produtos | json}}-->
                <li v-for="p in produtos" class="mdl-list__item mdl-color--white">
                <span class="mdl-list__item-primary-content">
                    <img :src="p.thumbnail.formats[0].formats.url" alt="" class="mdl-list-item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{p.productname}}
                </span>
                <span class="mdl-list__item-secondary-content">
                    <span class="mdl-list__item-secondary-info">{{p.preco}}</span>
                    <a class="mdl-list__item-secondary-action" href="#">
                        <input text="text"  v-model="p.qtd" class="qtd"/>
                        <!--<i class="material-icons">star</i>-->
                    </a>
                </span>
                </li>
            </ul>

        </div>
        <a  class="circle-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons" role="presentation">add</i>
        </a>

    </main>
</template>
<style scoped>
  
    ul.mdl-list{
        width: 100%;
    }
    li.mdl-list__item.mdl-color--white {
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

    input.qtd{
        width: 30px;
        height: 30px;
        text-align: center;
        background-color: beige;
        border-radius: 5px;
        border: 0;
    }
</style>
<script>
    import lista from '../store/listas'

    export default{
        name:"listaProdutos",
        data(){
            return {
                produtos:[]
            }
        },
        created() {
            this.$parent.headerVisible = true;
            this.$parent.title = this.$route.params.lista;
            if (this.produtos.length == 0) {
                lista.fetchListaProdutos().then( p => {
                    this.produtos = p;
                });
            }
        },
        methods: {
            remove () {

            }
        }
    }
</script>