<template>
    <div class="mdl-textfield__search">
        <input id="search" placeholder="pesquise produtos" class="mdl-textfield__input" type="text" >
        <label class="mdl-button mdl-js-button mdl-button--icon icon-search" for="search">
            <i class="material-icons ">search</i>
        </label>
    </div>
</template>
<style scoped>
    input {
        width: 99%;
        height: 30px;
        color: #9d9d9d;
        border: 0;
        border-radius: 3px;
        background-color: #fff;
        padding: 3px 3px;
    }
    .mdl-textfield__search {
        padding: 5px 10px;
        background-color: #3F51B5;
    }
    .icon-search {
        color: #000;
        right: 10px;
        position: absolute;
        top: 7px;
    }
    body{
        /*background-color:#ff0000;*/
    }
</style>
<script>

    export default {
        name:'SearchBox',
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>