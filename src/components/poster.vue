<template>
    <div class="poster-wrap">
        <div class="drag-window" id="drag-window">

            <div id="startImgIndex">
                <img class="tpl"  src="../../static/img/tpl1.png">
                <div class="text">
                    我是来自{{department}}部门的{{name}}
                </div>
            </div>
            
            <img id="imgChose" class="imgChose" :src= "imgBase64" />
            
        </div>
        <div class="cut-btn">
            <button @click="cutPicture">确定</button>
            <input type="file" @change="uploadPic($event)" value="上传" accept="image/*" capture="camera" multiple>
        </div>

        <img :src="createPic" class="createPic">

        <div class="loading" v-if="showLoading">loading...</div>
    </div>
</template>

<script>
    import Drag from './drag.js';

    import html2canvas from 'html2canvas';

    import lrz from 'lrz'; // 用来处理ios拍照旋转问题

    export default {
        data() {
            return {
                createPic: '',
                name: '李雷',
                department: '维修部',
                imgBase64: '',
                showLoading: false

            }
        },
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
                transform: rotate(-10deg);
            }
            .imgChose {
                position: absolute;
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
</style>