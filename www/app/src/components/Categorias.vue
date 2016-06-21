<template>
 <main class="mdl-layout__content mdl-color--grey-100">
    <div class=" mdl-grid">
        <mdl-spinner :active="categorias.length ==0"></mdl-spinner>
        <ul class="mdl-list">
            {{ favoritos | json}}
            <li v-for="c in categorias" class="mdl-list__item mdl-color--white">
                <span class="mdl-list__item-primary-content" v-link="{ path: '/404' }">
                    <img :src="c.thumb.url" alt="" class="mdl-list__item-avatar">
                    <!--<i class="material-icons ">person</i>-->
                    {{c.nome}}
                </span
                <span class="mdl-list__item-secondary-content">
                    <!--<span class="mdl-list__item-secondary-info">add</span>-->
                    <mdl-icon-toggle :checked.sync="favoritos" icon="star" :value="c.id"></mdl-icon-toggle>
                    <!--<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>-->
                </span>
            </li>
        </ul>
    </div>
</main>
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
                favoritos:[ 500, 487, 502, 564 ],
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