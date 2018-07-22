<template>
    <div id="app">
        <loading :percent="loadPercent" v-if="!loadFinished"></loading>
        <router-view v-if="loadFinished" />
    </div>
</template>

<script>

import load from "apreload";
import loading from './components/loading.vue'
import imglists from "./util/imglist.js";

export default {
    name: "App",
    components: {loading},
    data() {
        return {
            loadPercent: 0,
            loadFinished: false
        }
    },
    created() {
        let that = this;
        let imgPathLists = imglists.map(file => {
            return `/static/img/${file}`;
        });

        let preload = new load.imageLoad({
            progress(i, count) {
                that.loadPercent = Math.floor(i / count * 100);
                console.log(Math.floor(i / count * 100));
            }
        });

        preload.load(imgPathLists)
            .then(res => {
                this.loadFinished = true;
                console.log('加载完成:', res);
            })
            .catch(err => {
                console.log('加载失败：', err);
            })
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
