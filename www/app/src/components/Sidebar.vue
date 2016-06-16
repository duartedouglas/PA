<template>

    <div class=" mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">

        <header v-if="user" class="demo-drawer-header">
            <!--<img src="" class="demo-avatar">-->
            <img v-lazy="user.photoURL" class="demo-avatar">
            <div class="demo-avatar-dropdown">
                <span>{{ user.displayName }}</span>
                <div class="mdl-layout-spacer"></div>
                <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                    <i class="material-icons" role="presentation">arrow_drop_down</i>
                    <span class="visuallyhidden">Accounts</span>
                </button>
                <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">

                    <li class="mdl-menu__item">{{ user.email }}</li>
                    <li v-if="!user.displayName" class="mdl-menu__item">
                        <a v-link="{path:'/login'}"><i class="material-icons">assignment_ind</i>login</a>
                    </li>
                    <li v-if="user.displayName" @click="logout" class="mdl-menu__item"><i class="material-icons">exit_to_app</i>Sair</li>
                </ul>
            </div>
        </header>

        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
            <a class="mdl-navigation__link" v-link="{ path: '/' }">
                <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>
                Home
            </a>
            <a class="mdl-navigation__link" v-link="{ path: '/produtos' }">
                <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>
                Produtos
            </a>

            <a class="mdl-navigation__link" v-link="{ path: '/categorias' }">
                <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>
                Categorias
            </a>

            <a class="mdl-navigation__link" v-link="{ path: '/login' }">
                <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a>

            <div class="mdl-layout-spacer"></div>
            <a class="mdl-navigation__link" v-link="{ path: '/404' }">
                <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i>
                <span class="visuallyhidden">Help</span>
            </a>
        </nav>
    </div>

</template>
<style>
    body{
        /*background-color:#ff0000;*/
    }
</style>
<script>

    import Firebase from '../store/fb'
    export default{
        name: 'Sidebar',

        data(){
            return{
                user:{photoURL:'static/images/user.jpg'}
            }
        },
        ready(){
         Firebase.auth().onAuthStateChanged((user) =>{
           if (user) {
             console.log(user)
             this.user = user;

             var displayName = user.displayName;
             var email = user.email;
             var emailVerified = user.emailVerified;
             var photoURL = user.photoURL;
             var isAnonymous = user.isAnonymous;
             var uid = user.uid;
             var refreshToken = user.refreshToken;
             var providerData = user.providerData;

             this.accountDetails = {
               displayName: displayName,
               email: email,
               emailVerified: emailVerified,
               photoURL: photoURL,
               isAnonymous: isAnonymous,
               uid: uid,
               refreshToken: refreshToken,
               providerData: providerData
             };
             // [END_EXCLUDE]
           } else {

             this.status = 'Signed out';
             this.signin = 'Entrar com Google';
             this.accountDetails = 'null';
             this.oauthtoken = 'null';

           }

           this.googleDisabled = false;
         });
        },
        methods:{
            logout(){
                Firebase.auth().signOut();
            }
        }
    }
</script>