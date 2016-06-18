
<template>

    <div class="mdl-color--white">
        <div class="mdl-grid">
            <!-- MDL Spinner Component -->
            <div v-if="produtos.length ==0" style="top: 50%; margin: 0 auto;" class="mdl-spinner mdl-js-spinner is-active"></div>
            <ul class="mdl-list">
                <!--{{produtos | json}}-->
                <li v-for="p in produtos" class="mdl-list__item mdl-color--white">
                    <span class="mdl-list__item-primary-content">
                        <img v-lazy="p.thumbnail.formats[0].formats.url" alt="" class="mdl-list__item-avatar">
                        <!--<i class="material-icons ">person</i>-->
                        {{p.productname}}
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <span class="mdl-list__item-secondary-info">
                            {{p.Preco || 'indisponivel'}} hgghg
                            <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1">
                                <input type="checkbox" id="list-switch-1" class="mdl-switch__input" checked />
                            </label>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
        <button  class="circle-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">add</i>
        </button>
    </div>

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
        //created (){
        //    if (this.produtos.length == 0) {
        //        this.produtos = store.fetchProdutos(['']);
        //    }
        //},
        created () {
            store.on('produtos-updated', this.update)
        },

        methods: {
            update (produtos) {
                this.produtos = produtos;
            }
        },
    }
</script>