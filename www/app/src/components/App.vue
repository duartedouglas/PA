<template>
    <div>
        <Navbar :title.sync="title"> </Navbar>
        <SideBar> </SideBar>

        <main class="mdl-layout__content mdl-color--grey-100">

            <router-view></router-view>

        </main>
    </div>

</template>
<script>
    import Navbar from './Navbar.vue';
    import Sidebar from './Sidebar.vue';

    export default {
        name: 'App',
        data(){
            return {
                title:'MenorPreço',
                accountDetails:{}
            }
        },
        components:{
            Navbar,
            Sidebar
        },
        ready(){

        }
    }
</script>
