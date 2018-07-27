<template>
    <div id="app" class="app-wrap">
        <loading :percent="loadPercent" v-if="loadPercent < 100"></loading>
        <router-view v-if="loadPercent >= 100" class="router-wrap" />
    </div>
</template>

<script>

// import load from "apreload";
import loading from './components/loading.vue'
import imglists from "./util/imglist.js";

// import Preload from 'preload' 
import createjs from 'preload-js';

export default {
    name: "App",
    components: {loading},
    data() {
        return {
            loadPercent: 0,
            loadFinished: false
        }
    },
    createdOld() {
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
    },
    created() {
        let sourcePathLists = imglists.map(file => {
            return `/static/img/${file}`;
        });

        let curLoadedNum = 0;

        var queue = new createjs.LoadQueue(false);

        // 加载图片
        sourcePathLists.forEach(file => {
            queue.loadFile(file);
        });

        queue.on('complete', () => {
            console.log('ok!!')
        });
        queue.on('progress', (data) => {
            let percent = Math.floor(data.loaded * 100);
            this.loadPercent = percent;
            console.log('pro:', percent)
        });
    }
};
</script>

<style lang="scss">
    .app-wrap, .router-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
