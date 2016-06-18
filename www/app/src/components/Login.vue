<template>

    <div class="mdl-card mdl-shadow--6dp">

        <div class="mdl-card__supporting-text">

            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" type="text" id="username" />
                <label class="mdl-textfield__label" for="username">Usuario</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" type="password" id="userpass" />
                <label class="mdl-textfield__label" for="userpass">Senha</label>
            </div>

        </div>
        <div class="mdl-card__actions mdl-card--border">
            <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Logar</button>
        </div>
        <button :disabled="googleDisabled" class="mdl-button mdl-js-button mdl-button--raised" @click="toggleSignIn">{{ signin }}</button>

    </div>

</template>
<style scoped>
    .mdl-shadow--6dp{
        width: 100%;
    }
   .mdl-layout {
        align-items: center;
        justify-content: center;
    }
    .mdl-layout__content {
        padding: 24px;
        flex: none;
    }
</style>
<script>
    import firebase from '../store/fb'

    export default{
        data(){
            return{
                googleDisabled:false,
                status: 'Signed out',
                signin: 'Entrar com Google',
                accountDetails: 'null',
                oauthtoken: 'null'
            }
        },
        ready() {

         firebase.auth().onAuthStateChanged((user) =>{
           if (user) {

             var displayName = user.displayName;
             var email = user.email;
             var emailVerified = user.emailVerified;
             var photoURL = user.photoURL;
             var isAnonymous = user.isAnonymous;
             var uid = user.uid;
             var refreshToken = user.refreshToken;
             var providerData = user.providerData;

             this.status = 'Signed in';
             this.signin = 'Sair';
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
             this.$route.redirect('/');
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
            // [START googlecallback]
          toggleSignIn() {
            if (!firebase.auth().currentUser) {
              // [START createprovider]
              var provider = new firebase.auth.GoogleAuthProvider();
              // [END createprovider]
              // [START addscopes]
              provider.addScope('https://www.googleapis.com/auth/plus.login');
              // [END addscopes]
              // [START signin]
              firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // [START_EXCLUDE]
                //this.oauthtoken = token;
                // [END_EXCLUDE]
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                  alert('You have already signed up with a different auth provider for that email.');
                  // If you are using multiple auth providers on your app you should handle linking
                  // the user's accounts here.
                } else {
                  console.error(error);
                }
                // [END_EXCLUDE]
              });
              // [END signin]
            } else {
              // [START signout]
              firebase.auth().signOut();
              // [END signout]
            }
            // [START_EXCLUDE]
            this.googleDisabled = true;
            // [END_EXCLUDE]
          }

        }
    }
   
    
</script>