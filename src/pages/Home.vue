<template>
    <div>
     
        <login v-if="false"></login>

        <write-login-info v-if="false"></write-login-info>
        
        <select-user v-if="false"></select-user>

        <begin-video v-if="false"></begin-video>

        <poster v-if="true"></poster>

        <home-wheel v-if="false"></home-wheel>
    </div>
</template>

<script>
    import imglists from "../util/imglist.js";

    import login from '../components/login.vue';
    import writeLoginInfo from '../components/writeLoginInfo.vue';
    import selectUser from '../components/selectUser.vue';

    import beginVideo from '../components/beginVideo.vue'

    import poster from '../components/poster.vue'
    import homeWheel from '../components/homeWheel.vue';
    
    export default {
        components: {login, writeLoginInfo, selectUser, beginVideo, poster, homeWheel},
        data() {
            return {
                imglist: imglists.map(file => `/static/img/${file}`)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>