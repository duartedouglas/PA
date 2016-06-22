<template>
    <div>
        <Navbar :title.sync="title" :search.sync="search" :visible.sync="headerVisible"> </Navbar>
        <SideBar> </SideBar>
        
        <router-view></router-view>

    </div>
</template>
<script>
    import Navbar from './Navbar.vue';
    import Sidebar from './Sidebar.vue';
    import Firebase from '../store/fb'

    export default {
        name: 'App',
        data(){
            return {
                search:'',
                title:'MenorPreço',
                headerVisible:true,
            }
        },
        components: {
            Navbar,
            Sidebar
        },
        ready() {
            this.headerVisible = true;
            Firebase.auth().onAuthStateChanged((user) => {
                this.user = user;
                console.log(user, 'staus change')
                if (user) {
                    if(user.isAnonymous){
                    }

                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var refreshToken = user.refreshToken;
                    var providerData = user.providerData;
                    
                    localStorage.setItem('userUID', uid);

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
                } else{
                    localStorage.removeItem('userUID');
                }
            });
        }
    }
</script>
