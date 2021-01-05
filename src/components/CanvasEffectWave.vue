<template>
    <div>
    <canvas></canvas>
    </div>
</template>
<script>
    export default {
        name: 'CanvasEffect',
        data:function(){
            return {
                section : [],
                container : '',
                canvas : '',
                ctx : '',
                stageWidth : 0,
                stageHeight : 0,
                stageWidthHalf : 0,
                stageHeightHalf : 0,
                maxWidth : 0,
                widthGap : 0,
                isDown : 0, mouseX : 0, mouseY : 0,
                points : [], isShowPoint : 0,
                isColor : 1,
                FRICTION : 0.96,
                TOTALWAVE : 3,
                TOTALPOINTS : 3,
                COLORS : [
                    [
                        {h:189, s:100, l:46},
                        {h:196, s:100, l:39},
                        {h:207, s:100, l:31}
                    ],
                    [
                        {h:0, s:100, l:50},
                        {h:60, s:100, l:50},
                        {h:180, s:100, l:50}
                    ]],
                SPRING : [
                    .04,
                    .06,
                    .03
                ],
                raf : ''
            };
        },
        mounted(){
            console.log('mounted');
            this.section = [...document.getElementsByTagName('section')];
            this.canvas = document.getElementsByTagName('canvas')[0];
            this.container = document.getElementById('canvas_container');
            window.addEventListener('resize', this.onResize, true);
            this.onResize();

            this.start();
        },
        methods:{
            onResize() {
                console.log('onResize');
                this.stageWidth = window.innerWidth;
                this.stageHeight = window.innerHeight;

                this.stageWidthHalf = this.stageWidth >> 1;
                this.stageHeightHalf = this.stageHeight >> 1;

                this.widthGap = this.stageWidth / this.TOTALPOINTS >> 1;
                this.maxWidth = this.stageWidth + (this.widthGap * 2);

                this.canvas.width = this.stageWidth;
                this.canvas.height = this.stageHeight;
                this.ctx = this.canvas.getContext('2d');

                this.build();
            },
            build() {
                var i, k, point;
                for (i=0; i<this.TOTALWAVE; i++) {
                    this.points[i] = [];

                    for (k=0; k<this.TOTALPOINTS; k++) {
                        point = {x: this.maxWidth / (this.TOTALPOINTS - 1) * k - this.widthGap, y:this.stageHeightHalf + (Math.random() * 50), vy:0};
                        this.points[i][k] = point;
                    }
                }
            },
            start() {

                window.addEventListener('scroll', this.onScroll );


                window.addEventListener('mousedown', this.onDown, false);
                window.addEventListener('mouseup', this.onUp, false);
                window.addEventListener('mousemove', this.onMove, false);

                if (!!('ontouchstart' in window)) {
                    window.addEventListener('touchstart', this.touchStart, false);
                    window.addEventListener('touchmove', this.touchMove, false);
                    window.addEventListener('touchend', this.touchEnd, false);
                }


                // this.canvas.addEventListener('mousedown', this.onDown, false);
                // this.canvas.addEventListener('mouseup', this.onUp, false);
                // this.canvas.addEventListener('mousemove', this.onMove, false);

                // if (!!('ontouchstart' in window)) {
                //     this.canvas.addEventListener('touchstart', this.touchStart, false);
                //     this.canvas.addEventListener('touchmove', this.touchMove, false);
                //     this.canvas.addEventListener('touchend', this.touchEnd, false);
                // }

                // this.initController();

                this.raf = window.requestAnimationFrame(this.animate);
            },
            initController() {
                var signalOpt = {
                    moveControl: new signals.Signal(),
                    pointsNumChanged: new signals.Signal()
                };

                var container = new CMControl.Panel();
                container.setClass('sidebar');

                var titleBar = new CMControl.TitleBar(container, signalOpt);
                titleBar.setClass('title-bar');
                container.add(titleBar);
                var item = new CMControl.Panel();
                item.setTextContent('WAVE ANIMATION');
                item.setClass('title');
                titleBar.add(item);
                item = new CMControl.Panel();
                item.setTextContent('VERSION 1.0 - JONGMIN KIM');
                item.setClass('title-s');
                titleBar.add(item);

                // points num
                var pointsCon = new CMControl.Panel();
                container.add(pointsCon);
                var pointsItem = new CMControl.Panel();
                pointsItem.setTextContent('POINTS NUM : 8');
                pointsItem.setClass('label');
                pointsCon.add(pointsItem);
                var slidePoints = new CMControl.Slide(CMControl.getCurrent(8, 3, 16, 0, 1));
                slidePoints.onChange(function (value) {
                    signalOpt.pointsNumChanged.dispatch({num: value});
                });
                pointsCon.add(slidePoints);
                signalOpt.pointsNumChanged.add(function(object) {
                    var num = CMControl.getCurrent(object.num, 0, 1, 3, 16) | 0;
                    this.TOTALPOINTS = num;
                    pointsItem.setTextContent('POINTS NUM : ' + this.TOTALPOINTS);
                    onResize();
                });

                // points show/hide
                var checkCon = new CMControl.Panel();
                checkCon.setClass('check');
                container.add(checkCon);
                var checkItem = new CMControl.Panel();
                checkItem.setTextContent('SHOW POINTS');
                checkItem.setClass('label');
                checkCon.add(checkItem);
                var checkBack = new CMControl.Radio(true);
                checkBack.setClass('check-box');
                checkBack.onChange(function() {
                    if (!this.isShowPoint) return;
                    this.isShowPoint = 0;
                    checkFront.setValue(0);
                });
                checkCon.add(checkBack);
                item = new CMControl.Panel();
                item.setTextContent('HIDE');
                item.setClass('check-text');
                checkCon.add(item);

                container.add(checkCon);
                var checkFront = new CMControl.Radio(false);
                checkFront.setClass('check-box');
                checkFront.onChange(function() {
                    if (this.isShowPoint) return;
                    this.isShowPoint = 1;
                    checkBack.setValue(0);
                });
                checkCon.add(checkFront);
                item = new CMControl.Panel();
                item.setTextContent('SHOW');
                item.setClass('check-text');
                checkCon.add(item);

                // color
                var colorCon = new CMControl.Panel();
                colorCon.setClass('check');
                container.add(colorCon);
                var colorItem = new CMControl.Panel();
                colorItem.setTextContent('COLOR');
                colorItem.setClass('label');
                colorCon.add(colorItem);
                var colorBack = new CMControl.Radio(true);
                colorBack.setClass('check-box');
                colorBack.onChange(function() {
                    if (!this.isColor) return;
                    this.isColor = 0;
                    colorFront.setValue(0);
                });
                colorCon.add(colorBack);
                item = new CMControl.Panel();
                item.setTextContent('BLUE');
                item.setClass('check-text');
                colorCon.add(item);

                var colorFront = new CMControl.Radio(false);
                colorFront.setClass('check-box');
                colorFront.onChange(function() {
                    if (this.isColor) return;
                    this.isColor = 1;
                    colorBack.setValue(0);
                });
                colorCon.add(colorFront);
                item = new CMControl.Panel();
                item.setTextContent('COLORFUL');
                item.setClass('check-text');
                colorCon.add(item);

                // label
                var labelCon = new CMControl.Panel();
                container.add(labelCon);
                item = new CMControl.Panel();
                item.setHTMLContent('<a href="http://blog.cmiscm.com/?p=5452" target="this.blank">BLOG.CMISCM.COM</a>');
                item.setClass('link');
                labelCon.add(item);

                signalOpt.moveControl.add(function(object) {
                    var tx = object.x;
                    slidePoints.setGap(tx);
                });

                document.body.appendChild(container.dom);
            },
            animate(timestamp) {
                this.raf = window.requestAnimationFrame(this.animate);
                this.loop();
            },
            loop() {
                this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

                var i, arr = [0, 5, -5];
                for (i=0; i<this.TOTALWAVE; i++) {
                    this.draw(this.points[i], this.COLORS[this.isColor][i], this.SPRING[i], arr[i]);
                }

                if (this.isShowPoint) {
                    this.drawPoints(this.points[0], '#ff0000');
                }
            },
            draw(point, color, spring, gap) {


                // this.ctx.fillStyle = "rgba(0,255,0,0.2)";
                // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.ctx.beginPath();
                this.ctx.fillStyle = 'hsla(' + color.h + ', ' + color.s + '%, ' + color.l + '%, 0.4)';

                var prevx = point[0].x, prevy = point[0].y,
                    i, dx, dy, dist, my, cx, cy;

                this.ctx.moveTo(prevx, prevy);

                for (i=0; i<this.TOTALPOINTS; i++) {
                    dx = this.mouseX - point[i].x;
                    dy = (this.mouseY - this.stageHeight) / 2;
                    dist = Math.sqrt(dx * dx + dy * dy) * 0.01;
                    my = (this.mouseY / dist) + this.stageHeightHalf;

                    point[i].vy += (my - point[i].y + gap) * spring;
                    point[i].vy *= this.FRICTION;
                    point[i].y += point[i].vy;

                    cx = (prevx + point[i].x) * .5;
                    cy = (prevy + point[i].y) * .5;
                    this.ctx.bezierCurveTo(prevx, prevy, cx, cy, cx, cy, point[i].x, point[i].y);

                    prevx = point[i].x;
                    prevy = point[i].y;
                }

                this.ctx.lineTo(prevx, prevy);
                this.ctx.lineTo(this.maxWidth, this.stageHeight);
                this.ctx.lineTo(point[0].x, this.stageHeight);
                this.ctx.fill();
                this.ctx.closePath();
            },
            drawPoints(point, color) {
                this.ctx.beginPath();
                this.ctx.fillStyle = color;
                var i, cx, cy;
                for (i=0; i<this.TOTALPOINTS; i++) {
                    cx = point[i].x;
                    cy = point[i].y;
                    this.ctx.beginPath();
                    this.ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            },
            touchStart(e) {
                var touch = e.touches[0];
                this.downFn(touch.pageX, touch.pageY);
            },
            touchMove(e) {
                e.preventDefault();
                var touch = e.touches[0];
                this.moveFn(touch.pageX, touch.pageY);
            },
            touchEnd(e) {
                this.upFn();
            },
            onDown(e) {
                this.downFn(e.pageX, e.pageY);
            },
            onMove(e) {
                this.moveFn(e.pageX, e.pageY);
            },
            onUp(e) {
                this.upFn();
            },
            downFn(mx, my) {
                this.isDown = 1;
                this.mouseX = mx;
                this.mouseY = my;
            },
            moveFn(mx, my) {
                // if (!this.isDown) return;
                this.mouseX = mx;
                this.mouseY = my;
            },
            upFn() {
                this.isDown = 0;
                this.mouseX = 0;
                this.mouseY = 0;
            },
            onScroll(){
                var last_known_scroll_position = window.scrollY;
                var ticking = false;

                console.log(last_known_scroll_position)
                this.section.forEach((sec, i) => {
                    if(sec.offsetTop < last_known_scroll_position-132){
                        console.log("section " + i)
                    }
                });
                
                // this.container.style.top = 132+last_known_scroll_position + 'px';
                // if (!ticking) {
                //     window.requestAnimationFrame(function() {
                //         console.log(last_known_scroll_position)
                //         // doSomething(last_known_scroll_position);
                //         this.canvas.height = last_known_scroll_position;
                //         ticking = false;
                //     });

                //     ticking = true;
                // }
            }
        }
    }
</script>

<style>

    canvas{
        z-index: 2;
        /* position: absolute;
        top: 0;
        left: 0; */
        /* background-color: rgba(0, 255, 0, 0.2); */
    }
</style>