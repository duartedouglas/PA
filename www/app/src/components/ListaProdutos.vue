<template>
    <!-- Tabs 
    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Tab 1</a>
        <a href="#fixed-tab-2" class="mdl-layout__tab">Tab 2</a>
        <a href="#fixed-tab-3" class="mdl-layout__tab">Tab 3</a>
    </div> -->
    <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mg-grid">
            <!-- MDL Spinner Component -->
             <mdl-spinner :active="loading"></mdl-spinner>
            <ul v-if="produtos.length" class="mdl-list">
                <!-- {{produtos | json}} -->
                <li v-for="p in produtos" class="mdl-list__item mdl-color--white">
                <span class="mdl-list__item-primary-content">
                    <img :src="p.thumbnail.formats[0].formats.url" alt="" class="mdl-list-item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{p.productname}}
                </span>
                <span class="mdl-list__item-secondary-content">
                    <span class="mdl-list__item-secondary-info">{{p.preco}}</span>
                    <label class="mdl-list__item-secondary-action">
                        <input text="number" v-model="p.qtd" placeholder="1" class="qtd"/>
                        <!--<i class="material-icons">star</i>-->
                    </label>
                </span>
                </li>
            </ul>
           <div class="page-content">

               <produtos v-if="$parent.search.length>2" :search="$parent.search" :lista="produtos"></produtos>

           </div>


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
    import lista from '../store/listas';
    import Firebase from '../store/fb';
    import Produtos from './Produtos.vue';

    export default{
        name:"listaProdutos",
        data(){
            return {
                menssage:'',
                loading:true,
                uid:'',
                nomeLista:'',
                produtos:[]
            }
        },
        components:{
            Produtos
        },
        created() {
            this.$parent.headerVisible = true;
            this.nomeLista = this.$route.params.lista;
            this.$parent.title = this.nomeLista;
            this.$parent.search = '';

            this.uid = localStorage.getItem('userUID');
            if(this.uid){
               
                lista.fetchListaProdutos(this.nomeLista).then( p => {
                    console.log(p)
                    this.produtos = p;
                    this.loading = false;
                }).catch(() => {
                    this.menssage = 'add itens a lista';
                    this.loading = false;
                });
            }
        },
        methods: {
            remove () {

            },
            add(){
                if(this.uid){

                    Firebase.database().ref('users/'+this.uid+'/listas/'+this.nomeLista).child(401400).set(1);
                }
            }
        }
    }
</script>