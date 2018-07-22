<template>
    <div>
        <m-header></m-header>
        home page
        <login></login>
        <!-- <img v-for="(item, index) in imglist" :src="item" :key="index"> -->

    </div>
</template>

<script>
    import mHeader from '../components/Header.vue';
    import login from '../components/login.vue';
    import imglists from "../util/imglist.js";
    export default {
        components: {mHeader, login},
        data() {
            return {
                imglist: imglists.map(file => `/static/img/${file}`)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>