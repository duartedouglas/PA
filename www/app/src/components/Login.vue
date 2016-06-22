<template>
<main class="mdl-layout__content mdl-color--grey-100">
  <div class="mdl-cell--12-col mdl-grid">
    <div class="mdl-card mdl-shadow--6dp">

        <div class="mdl-card__supporting-text">
            <div>
              <mdl-textfield floating-label="Usuario" :value.sync="usuario" id="username"></mdl-textfield>
            </div>
            <div>
              <mdl-textfield floating-label="Senha"  type="password" id="userpass" :value.sync="senha"></mdl-textfield>
            </div>

        </div>
        <div class="mdl-card__actions mdl-card--border">
            <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Logar</button>
        </div>
        <div class="mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
          <button :disabled="googleDisabled" class=" mdl-button mdl-js-button mdl-button--raised" @click="toggleSignIn">
            <div class="abcRioButtonIcon" style="padding:8px;display: initial">
            <div style="width:18px;height:18px;;display: inline" class="abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></div>
            </div>
             {{ signin }}
          </button>
        </div>
        
    </div>
  </div>
  </main>
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
    import firebase from '../store/fb';

    export default {
        data(){
            return{
                googleDisabled:false,
                status: 'Signed out',
                signin: 'Entrar com Google',
                accountDetails: 'null',
                oauthtoken: 'null',
                usuario:'',
                senha:''
            }
        },
        ready() {
          this.$parent.headerVisible = true;
          firebase.auth().onAuthStateChanged((user) =>{
            if (user) {

             this.status = 'Signed in';
             this.signin = 'Sair';
             
             this.$router.go('/');
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
          toggleSignIn() {
            if (!firebase.auth().currentUser) {
              let provider = new firebase.auth.GoogleAuthProvider();
              provider.addScope('https://www.googleapis.com/auth/plus.login');

              firebase.auth().signInWithPopup(provider).then(function(result) {
               
                let token = result.credential.accessToken;
                let user = result.user;
                
              }).catch(function(error) {
               
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
                
                if (errorCode === 'auth/account-exists-with-different-credential') {
                  alert('You have already signed up with a different auth provider for that email.');
                 
                } else {
                  console.error(error);
                }
              });
            } else {
              firebase.auth().signOut();
            }
            this.googleDisabled = true;
          }
        }
    } 
</script>