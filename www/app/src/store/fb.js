import Firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCtKlPSIX8XWt_a0ActPHy_npeyi7SIfOk",
    authDomain: "menorpreco.firebaseapp.com",
    databaseURL: "https://menorpreco.firebaseio.com",
    storageBucket: "project-2514258140772338106.appspot.com",
};
Firebase.initializeApp(config);
export default Firebase;