<template>

<div class="mdl-layout mdl-js-layout mdl-color--grey-100">
    <main class="mdl-layout__content">
        <div class="mdl-card mdl-shadow--6dp">

            <div class="mdl-card__supporting-text">
                <form action="#">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="username" />
                        <label class="mdl-textfield__label" for="username">Usuario</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="password" id="userpass" />
                        <label class="mdl-textfield__label" for="userpass">Senha</label>
                    </div>
                </form>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Logar</button>
            </div>
            <button :disabled="googleDisabled" class="mdl-button mdl-js-button mdl-button--raised" @click="toggleSignIn">{{ signin }}</button>

            <!-- Container where we'll display the user details -->
            <div class="quickstart-user-details-container">
              Firebase sign-in status: <span id="quickstart-sign-in-status">{{ status }}</span>
              <div>Firebase auth <code>currentUser</code> object value:</div>
              <pre><code id="quickstart-account-details">{{ accountDetails | json}}</code></pre>
              <div>Google OAuth Access Token:</div>
              <pre><code id="quickstart-oauthtoken">{{ oauthtoken }}</code></pre>
            </div>
        </div>
    </main>
</div>

</template>
<style scoped>
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
            let db = firebase.database().ref('users').on('value', u => {
                        console.log(u.val())
                    })
         firebase.auth().onAuthStateChanged((user) =>{
           if (user) {
             // User is signed in.
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
                this.oauthtoken = token;
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