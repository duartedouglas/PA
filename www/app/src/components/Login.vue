<template>
 <h1>{{ msg }}</h1>
</template>
<style>
    body{
        background-color:#fff;
    }
</style>
<script>
    import HeaderComponent from './components/header.vue'
    import OtherComponent from './components/other.vue'
    export default{
        data(){
            return{
                msg:'Tela de lLogin'
            }
        }
    }
</script>