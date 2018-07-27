<template>
    <div class="video-wrap">

        <video  id="video" class="video" preload="auto" playsinline src="/static/img/begin_video.mp4"
            type="video/mp4" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            setTimeout(() => {
                this.play();
                // let video = document.querySelector('.video');
                // video.click();
            }, 1000)
            
        },
        methods: {
            play() {
                let video = document.querySelector('.video');
                video.play();
            }
        }
    }
</script>

<style scoped lang="scss">
    .video-wrap {
        width: 100%;
        height: 100%;
        .video {
            width: 100%;
            height: 100%;
        }
    }
</style>