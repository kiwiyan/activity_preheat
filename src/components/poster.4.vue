<template>
    <div class="poster-wrap">
    <swiper :options="swiperOption" class="swiper">
        <swiper-slide><img class="s-pic" src="../../static/img/tpic1.png"></swiper-slide>
        <swiper-slide><img class="s-pic"  src="../../static/img/tpic2.png"></swiper-slide>
        <swiper-slide><img class="s-pic" src="../../static/img/tpic3.png"></swiper-slide>
        <swiper-slide><img class="s-pic" src="../../static/img/tpic4.png"></swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
        <!-- <div class="drag-window" id="drag-window">
            <img id="startImgIndex" class="tpl"  src="../../static/img/tpl1.png">
           
            
            <img id="imgChose" class="imgChose" :src= "imgBase64" />
            
        </div>
        <div class="cut-btn">
            <button @click="cutPicture">确定</button>
            <input type="file" @change="uploadPic($event)" value="上传" accept="image/*" capture="camera" multiple>
            <button @click="cancel">取消</button>
        </div>

        <img :src="createPic" class="createPic" v-if="showCreatePic">

        <div class="loading" v-if="showLoading">loading...</div> -->
    </div>
</template>

<script>
    import Drag from './drag.js';

    import html2canvas from 'html2canvas';

    import lrz from 'lrz'; // 用来处理ios拍照旋转问题
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css'
    export default {
        data() {
            return {
                createPic: '',
                name: '李雷',
                department: '维修部',
                imgBase64: '',
                showLoading: false,
                showCreatePic: true,
                slides: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
                ],
                swiperOption: {
                    loop: true,
                    followFinger : false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    // initialSlide :2,
                    autoplay: {
                        delay: 300000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    autoplayDisableOnInteraction : false,
                    slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
                    centeredSlides: true//<span style="color:rgb(68,68,68);font-family:'microsoft yahei';font-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
                }

            }
        },
        components: {swiper,swiperSlide},
        mounted() {
            
        },
        methods: {
            cutPicture() {
                let that = this;
                html2canvas(document.querySelector('#drag-window')).then(function(canvas) {
                    // document.body.appendChild(canvas);
                    let pic = canvas.toDataURL('image/jpeg');
                    that.createPic = pic;
                });
            },
            uploadPic(e) {   
                this.showCreatePic = true;
                this.showLoading = true;         
                let reader = new FileReader();
                let that = this;
                lrz(e.target.files[0]).then(res=>{
                            //console.log(res.origin.exifdata.SubsecTimeOriginal)
                    console.log(res.origin.exifdata)    
                        
                    let picBase64 = res.base64 ;
                    that.imgBase64 = picBase64;

                    that.showLoading = false;

                    // draw
                    Drag.drag({
                        startId:'startImgIndex',
                        moveId:'imgChose',
                        scale:true                     
                    });
                })
            },
            cancel() {
                this.showCreatePic = false;
                this.createPic = '';
            }
        }
    }
</script>

<style scoped lang="scss">
    .poster-wrap {
        position: relative;
        width: 100%;
        min-height: 100%;
        background: url(../../static/img/BG@2x.png) no-repeat 0 0/100% 100%;
        font-size: 16px;
        color: #fff;

        .drag-window {
            position: absolute;
            overflow: hidden;
            border: 1px solid;
            $width:4rem;
            $height: 5.5rem;
            width: $width;
            height: $height;
            top: 50%;
            left: 50%;
            margin-left: -$width/2;
            margin-top: -$height/2;
            .tpl {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 100;
            }
            .text {
                
                position: absolute;
                bottom: 0.7rem;
                left: 0.2rem;
                z-index: 100;
                background: rgb(44, 54, 54);
            }
            .imgChose {
                position: absolute;
                width: 100%;
                z-index: 10;
            }
            
        }
        .cut-btn {
            position: absolute;
            bottom: 0.2rem;
        }
        .createPic {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 90%;
            transform: translate(-50%, -50%);
            z-index: 100;
        }
        .loading {
            position: absolute;
            background: #5cc;
            left: 50%;
            bottom: 50%;
        }
    }
    .swiper-container {
        padding-top: 1rem;
        width: 80%;
        height: 10rem;
    }
    div.swiper-wrapper {
        width: 100%;
        height: 3rem;
    }
    .swiper-slide {
        width: 75%;
        height: 80%;
        // border: 2px solid #5cc;
        overflow: hidden;
        .s-pic {
            width: 80%;
            // height: 80%;
        }

    }
    .swiper-slide-prev {
        display: flex;
        align-items: center;
        position: relative;
        opacity: 0.7;
        .s-pic {
            position: absolute;
            right: -20%;
            width: 80%;
            // height: 80%;
        }
    }
    .swiper-slide-active {
        // width: 70%;
        height: 80%;
        
        .s-pic {
            
            width: 100%;
            // height: 100%;
        }
    }
    .swiper-slide-next {
        display: flex;
        align-items: center;
        position: relative;
        opacity: 0.7;
        .s-pic {
            position: absolute;
            left: -20%;
            width: 80%;
            height: 80%;
        }
    }
</style>