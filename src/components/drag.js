 ////移动组件 moveId ,startId
 let Drag = (option) => {
    //增加放大功能
    let htmls = document.querySelector('#drag-window');
    let ele = document.querySelector('#' + option.moveId);
    let startEle = ele
    if (option.startId) {
        startEle = document.querySelector('#' + option.startId)
    }

    let startFingerX = null;
    let startFingerY = null;
    let endFinger = null;
    let eleLeft = null;
    let eleTop = null;
    let change = {
        init: 1,
        start: null,
        size: null,
        sizeScale: null
    }
    let zoom = {
            initscale: 1,
            startLength: null,
            moveLength: null,
            lengths: null
        }
        //改变拖动元素的尺寸
    let moveEle = (x, y) => {

        ele.style.left = eleLeft + x + "px";
        ele.style.top = eleTop + y + "px";
    }
    let changeMax = (s, m) => {


            zoom.lengths = Math.abs(((m - s) / 100) + zoom.initscale);
            zoom.lengths = zoom.lengths > .5 ? zoom.lengths : .5;
            ele.style.webkitTransform = 'scale(' + zoom.lengths + ')';
        }
        //单手拖动计算
    function touchMove(e) {
        e.preventDefault();
        e.stopPropagation();
        let moveX = e.changedTouches[0].clientX - startFingerX;
        let moveY = e.changedTouches[0].clientY - startFingerY;
        if (option.changebig) {
            change.size = getO(e)
            change.sizeScale = ((change.size - change.start) / 100) + change.init;
            console.log(change.sizeScale)
            change.sizeScale = change.sizeScale > .5 ? change.sizeScale : .5;
            ele.style.webkitTransform = 'scale(' + change.sizeScale + ')';
        } else {
            moveEle(moveX, moveY)
        }

    }
    //两个手指拖动计算
    function touchTwoMove(e) {
        e.preventDefault();
        e.stopPropagation();
        zoom.moveLength = getC(e);
        changeMax(zoom.startLength, zoom.moveLength)
    }
    //放大尺寸
    function getC(ev) {
        var x1 = ev.targetTouches[0].pageX;
        var y1 = ev.targetTouches[0].pageY; //两根手指缩放肯定需要两根手指，【0】第一根手指的Xy的坐标

        var x2 = ev.targetTouches[1].pageX; //第二根手指的坐标
        var y2 = ev.targetTouches[1].pageY;

        var a = x1 - x2; //第一根手指的pageX-第二根手指的pageX，这样正好是一个之间三角形 得到两个直角边；
        var b = y1 - y2; //同上         
        return Math.sqrt(a * a + b * b) //已知两个直角边开平方得出 斜角边
    };
    //单手放大
    function getO(ev) {
        var x1 = ev.targetTouches[0].pageX;
        var y1 = ev.targetTouches[0].pageY;
        var a = x1 - startFingerX; //第一根手指的pageX-第二根手指的pageX，这样正好是一个之间三角形 得到两个直角边；
        var b = y1 - startFingerY; //同上   
        if (a < 0 || b < 0) {
            return -Math.sqrt(a * a + b * b) //已知两个直角边开平方得出 斜角边
        }
        return Math.sqrt(a * a + b * b) //已知两个直角边开平方得出 斜角边
    }
    startEle.addEventListener('touchstart', function(e) {
        if(option.touchStart){
            option.touchStart()
        }
        //e.preventDefault();
        e.stopPropagation();
        if (e.targetTouches.length == 1) {
            startFingerX = e.changedTouches[0].clientX;
            startFingerY = e.changedTouches[0].clientY;
            eleLeft = ele.offsetLeft;
            eleTop = ele.offsetTop;
            //如果需要放大
            if (option.changebig) {
                change.start = getO(e);
            }
            //移动过程中
            htmls.addEventListener('touchmove', touchMove, false);
            //移动结束
            htmls.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                let FingerX = e.changedTouches[0].clientX;
                let FingerY = e.changedTouches[0].clientY;
               

                if (option.area &&
                    option.area.x[0] < FingerX &&
                    FingerX < option.area.x[1] &&
                    option.area.y[0] < FingerY &&
                    FingerY< option.area.y[1]) {
                       console.log('lls')
                    if (option.callRight) {
                        console.log(111)
                        option.callRight()
                    }
                }
                if (option.call) {
                    option.call()
                }
                //结束拖动
                htmls.removeEventListener('touchmove', touchMove);
                change.init = change.sizeScale;
                console.log(change.init, "结束")
                e.returnValue = true;
            });
        }
        if (e.targetTouches.length == 2 && option.scale) {

            //获取初始值
            zoom.startLength = getC(e);
            //移动过程中
            htmls.addEventListener('touchmove', touchTwoMove, false);
            //移动结束
            htmls.addEventListener('touchend', function(e) {
                //e.preventDefault();
                e.stopPropagation();
                zoom.initscale = zoom.lengths;

                if (option.call) {
                    option.call()
                }
                //结束拖动
                htmls.removeEventListener('touchmove', touchTwoMove);
                e.returnValue = true;
            });
        }


    })
};

export default {
    'drag': Drag
}