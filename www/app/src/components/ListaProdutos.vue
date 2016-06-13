<template>
    <div class="mg-grid">
        <ul class="mdl-list">
            <!--{{produtos | json}}-->
            <li v-for="p in produtos" class="mdl-list__item mdl-color--white">
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
    </div>

</template>
<style scoped>
    ul.mdl-list{
        width: 100%;
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