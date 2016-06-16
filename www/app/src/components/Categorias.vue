<template>
    <div  class=" mdl-grid">
        <ul class="mdl-list">
            <!--{{ categorias | json}}-->
            <li v-for="c in categorias" class="mdl-list__item mdl-color--white">
                <span class="mdl-list__item-primary-content" v-link="{ path: '/404' }">
                    <img v-lazy="c.thumb.url" alt="" class="mdl-list__item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{c.nome}}
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