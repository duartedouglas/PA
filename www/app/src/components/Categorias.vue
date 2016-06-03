<template>

    <ul class="mdl-list">
        <!--{{ categorias | json}}-->
        <li v-for="c in categorias" class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <img :src="c.thumb.url" alt="" class="mdl-list__item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{c.nome}}
                </span>
                <span class="mdl-list__item-secondary-content">
                    <!--<span class="mdl-list__item-secondary-info">add</span>-->
                    <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
                </span>
        </li>
    </ul>

</template>
<style>

</style>
<script>

    import categoria from '../store/categorias';

    export default{
        data() {
            return{
                categorias:[]
            }
        },
        created(){

            categoria.fetchCategorias().then(categorias => {
                this.categorias = categorias;
            });
        }
    }
</script>