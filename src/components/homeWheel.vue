<template>
    <div class="wheel-wrap">
        <div class="tab"></div>
        <div class="wheel" @touchmove="move($event)">
            <img class="wheel-pic" src="../../static/img/wheel.png">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rotateIndex: 0,
                rotateArr: [-20,-10,0, 10, 20, 30]
            }
        },
        mounted() {
            let wheel = document.querySelector('.wheel');
            let that = this;
            
            function right() {
                
                if (that.rotateIndex <= 2) {
                    that.rotateIndex += 1;
                }
                let r = that.rotateArr[that.rotateIndex + 2];

                console.log('right', that.rotateIndex + 2);
                wheel.style.transform = `rotate(${r}deg)`;


                
            }
            function left() {
               
                if (that.rotateIndex > 0) {
                    that.rotateIndex -= 1;
                }
                let r = that.rotateArr[that.rotateIndex + 2];

                 console.log('left', that.rotateIndex + 2);

                wheel.style.transform = `rotate(${r}deg)`;
            }

            this.handle().listenTouchDirection(document, true, false, right, false, left);

            
        },
        methods: {
            move(e) {
                
            },
            handle() {
                var EventUtil = {
                    addHandler: function (element, type, handler) {
                        if (element.addEventListener)
                            element.addEventListener(type, handler, false);
                        else if (element.attachEvent)
                            element.attachEvent("on" + type, handler);
                        else
                            element["on" + type] = handler;
                    },
                    removeHandler: function (element, type, handler) {
                        if(element.removeEventListener)
                            element.removeEventListener(type, handler, false);
                        else if(element.detachEvent)
                            element.detachEvent("on" + type, handler);
                        else
                            element["on" + type] = handler;
                    },
                    /**
                     * 监听触摸的方向
                     * @param target            要绑定监听的目标元素
                     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
                     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
                     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
                     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
                     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
                     */
                    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
                        this.addHandler(target, "touchstart", handleTouchEvent);
                        this.addHandler(target, "touchend", handleTouchEvent);
                        this.addHandler(target, "touchmove", handleTouchEvent);
                        var startX;
                        var startY;
                        function handleTouchEvent(event) {
                            switch (event.type){
                                case "touchstart":
                                    startX = event.touches[0].pageX;
                                    startY = event.touches[0].pageY;
                                    break;
                                case "touchend":
                                    var spanX = event.changedTouches[0].pageX - startX;
                                    var spanY = event.changedTouches[0].pageY - startY;

                                    if(Math.abs(spanX) > Math.abs(spanY)){      //认定为水平方向滑动
                                        if(spanX > 30){         //向右
                                            if(rightCallback)
                                                rightCallback();
                                        } else if(spanX < -30){ //向左
                                            if(leftCallback)
                                                leftCallback();
                                        }
                                    } else {                                    //认定为垂直方向滑动
                                        if(spanY > 30){         //向下
                                            if(downCallback)
                                                downCallback();
                                        } else if (spanY < -30) {//向上
                                            if(upCallback)
                                                upCallback();
                                        }
                                    }

                                    break;
                                case "touchmove":
                                    //阻止默认行为
                                    if(isPreventDefault)
                                        // event.preventDefault();
                                    break;
                            }
                        }
                    }
                };

                return EventUtil;
            },

        }
    }
</script>

<style scoped lang="scss">
    .wheel-wrap {
        width: 100%;
        min-height: 100%;
        background: url(../../static/img/BG@2x.png) no-repeat 0 0/100% 100%;
        font-size: 16px;
        color: #fff;
        overflow: hidden;
        .wheel {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -45%;
            transform: rotate(0deg);
            overflow: hidden;
            .wheel-pic {
                width: 80%;
            }

        }
    }

</style>