<template>
    <div class="poster-wrap">

        <div class="p1-design" v-if="viewClickedMakeBtn">
            <img class="p2-face" src="../../static/img/tpic1.png" />
            <div class="word">
                <div class="w-item"><div class="index">1</div>点击下方 我要制作海报按钮</div>
                <div class="w-item"><div class="index">2</div>选择喜欢的模板</div>
                <div class="w-item"><div class="index">3</div>上传自己的照片</div>
                <div class="w-item"><div class="index">4</div>输入相应的信息及梦想宣言</div>

                <div class="w-item under-word">即可形成个人专属海报，可保存留念也可分享至朋友圈。</div>
            </div>
            <div class="to-select-btn" @click="toSelectPoster"></div>
        </div>

        <div class="slect-wrap" v-if="viewSelectedPoster">
            <swiper :options="swiperOption" class="swiper" ref="mySwiper" @transitionEnd="callback" >
                <swiper-slide><img data-index="1" class="s-pic" src="../../static/img/tpic1.png"></swiper-slide>
                <swiper-slide><img data-index="2" class="s-pic"  src="../../static/img/tpic2.png"></swiper-slide>
                <swiper-slide><img data-index="3" class="s-pic" src="../../static/img/tpic3.png"></swiper-slide>
                <swiper-slide><img data-index="4" class="s-pic" src="../../static/img/tpic4.png"></swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div>
                 <div class="make-btn" @click="toMakePoster"></div>
            </div>
        </div>
        

        <div class="make-poster-wrap" v-if="viewMadePoster">
            <div class="drag-window" id="drag-window">
                <img id="startImgIndex" class="tpl"  src="../../static/img/tpl1.png">
            
                
                <img id="imgChose" class="imgChose" :src= "imgBase64" />
                
            </div>
            <div class="cut-btn">
                <button @click="cutPicture">确定</button>
                <input type="file" @change="uploadPic($event)" value="上传" accept="image/*" capture="camera" multiple>
                <button @click="cancel">取消</button>
            </div>

            <img :src="createPic" class="createPic" v-if="showCreatePic">

            <div class="loading" v-if="showLoading">loading...</div>
        </div>

        <div class="write-word-wrap" v-if="false">
            <div class="write-input">
                <div class="item date" @click="callDateWrap"><input type="text" v-model="date"></div>
                <div class="item department"><input type="text" v-model="department"></div>
            </div>
            <div class="btn-wrap">
                <div class="item btn-cancel"></div>
                <div class="item btn-sure"></div>
            </div>
        </div>

        <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="date">
        </mt-datetime-picker>


        
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
                viewClickedMakeBtn: true,
                viewSelectedPoster: false,
                viewMadePoster: false,
                createPic: '',
                name: '李雷',
                department: '维修部',
                date: '',
                imgBase64: '',
                showLoading: false,
                showCreatePic: true,
                swiperOption: {
                    // loop: true,
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : true
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }

            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        components: {swiper,swiperSlide},
        mounted() {
             
        },

        methods: {
            toSelectPoster() {
                this.viewClickedMakeBtn = false;
                this.viewSelectedPoster = true;
            },
            toMakePoster() {
                this.viewSelectedPoster = false;
                this.viewMadePoster = true;
            },
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
            },
            callback(obj) {
                
                let curEl = document.querySelector('.swiper-slide-active img');
                let index = curEl.getAttribute('data-index');

                console.log('oo:', index)
            },
            callDateWrap() {
                this.$refs.picker.open();
            }

        }
    }
</script>

<style scoped lang="scss">
    .poster-wrap {
        position: relative;
        width: 100%;
        min-height: 100%;
        background: url(../../static/img/p2_bg.png) no-repeat 0 0/100% 100%;
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
        .p1-design {

            .p2-face {
                width: 3rem;
                display: block;
                margin: 0 auto;
                padding-top: 1rem;
            }
            .word {
                margin: 0.5rem 0.6rem;
                font-size: 13px; //0.25rem
                .w-item {
                    display: flex;
                    margin: 0.2rem 0;
                    
                    .index {
                        $w-width:0.3rem;
                        width: $w-width;
                        height: $w-width;
                        line-height: $w-width;
                        margin-right: 0.2rem;
                        text-align: center;
                        border-radius: 50%;
                        background: #fff;
                        color: #000;
                    }
                    
                }
                .under-word {
                    line-height: 1.5;
                }
            }
            .to-select-btn {
                width: 4rem;
                height: 0.5rem;
                margin: 0 auto;
                background: url(../../static/img/make_poster_btn.png) no-repeat 0 0 /100% 100%;
            }
            
        }
    }

    .swiper-container {
        padding-top: 1.5rem;
        width: 80%;
    }
    .swiper-slide {

        width: 70%;
        // height: 300px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .make-btn {
        width: 4rem;
        height: 0.5rem;
        margin: 0.5rem auto;
        background: url(../../static/img/make_poster_btn.png) no-repeat 0 0 /100% 100%;
    }

    // 填写文字
    .write-word-wrap {
        padding-top: 2.4rem; 
        .write-input {
            position: relative;
            width: 5rem;
            height: 3rem;
            margin: 0 auto;
            background: url(../../static/img/p2_write_word_input.png) no-repeat 0 0 /100% 100%;
            .item {
                position: absolute;
                height: 0.5rem;
                width: 100%;
                left: 0.3rem;
                input {
                    display: block;
                    height: 100%;
                    border: none;
                }
            }
            .date {
                top: 0.8rem;
            }
            .department {
                bottom: 0.7rem;
            }

        }
        .btn-wrap {
            display: flex;
            padding: 0.5rem 0.3rem;
            justify-content: space-around;
            .item {
                width: 2rem;
                height: 0.5rem;
            }
            .btn-cancel {
                 background: url(../../static/img/p2_cancel_btn.png) no-repeat 0 0 /100% 100%;
            }
            .btn-sure {
                 background: url(../../static/img/p2_sure_btn.png) no-repeat 0 0 /100% 100%;
            }
        }
       
    }
</style>