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
                slope : 0,
                maxWidth : 0,
                widthGap : 0,
                last_known_scroll_position : 0,
                current_section : 0,
                isDown : 0, mouseX : 0, mouseY : 0,
                points : [], isShowPoint : 0,
                isColor : 1,
                STIFF : 0.1,
                FRICTION : 0.87,
                TOTALWAVE : 3,
                TOTALPOINTS : 8,
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
                this.stageHeightHalf = this.stageHeight / 1.5;

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
                        // point = {x: this.maxWidth / (this.TOTALPOINTS - 1) * k - this.widthGap, y:this.stageHeightHalf + (Math.random() * 50), vy:0};
                        point = {x: this.maxWidth / (this.TOTALPOINTS - 1) * k - this.widthGap, y:this.stageHeightHalf + k *this.slope, vy:0};
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

                this.raf = window.requestAnimationFrame(this.animate);
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
                    this.drawPoints(this.points[0], '#fff');
                }

            },
            draw(point, color, spring, gap) {


                // this.ctx.fillStyle = "rgba(0,255,0,0.2)";
                // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.ctx.beginPath();
                this.ctx.fillStyle = 'hsla(' + color.h + ', ' + color.s + '%, ' + color.l + '%, 0.4)';

                var prevx = point[0].x
                var prevy = point[0].y
                var i, dx, dy, dist, my, cx, cy;

                var mouseAndScollY = this.mouseY - window.scrollY;
                // this.ctx.moveTo(point[0].x, point[0].y);
                this.ctx.moveTo(prevx, prevy);
                for (i=1; i<this.TOTALPOINTS; i++) {

                    dx = this.mouseX - point[i].x;
                    dy = mouseAndScollY - point[i].y;
                    dist = Math.sqrt(dx * dx + dy * dy) * this.STIFF;
                    
                    if(mouseAndScollY < point[i].y){
                        my = (mouseAndScollY / dist) + this.stageHeightHalf - (window.scrollY/40*i);
                    }else{
                        my = -(mouseAndScollY / dist) + this.stageHeightHalf - (window.scrollY/40*i);
                    }
                    
                    console.log('my : ' + my);
                    point[i].vy += (my - point[i].y + gap + i * this.slope) * spring;
                    // point[i].vy += (my - point[i].y + gap + i * this.slope) * spring;
                    point[i].vy *= this.FRICTION;
                    point[i].y += point[i].vy ;

                    cx = (prevx + point[i].x) * .9;
                    cy = (prevy + point[i].y) * .9;
                    this.ctx.lineTo(prevx, prevy, cx, cy, cx, cy, point[i].x, point[i].y);
                    

                    // this.ctx.quadraticCurveTo(cx, cy, point[i].x, point[i].y);
                    
                    prevx = point[i].x;
                    prevy = point[i].y;

                    point[i].y += point[i].vy;
                    
                    // this.ctx.arc(point[i].x, point[i].y, 10, 0, 2 * Math.PI);
                }
                this.ctx.lineTo(prevx, prevy);
                this.ctx.lineTo(this.maxWidth, this.stageHeight);
                this.ctx.lineTo(point[0].x, this.stageHeight);
                this.ctx.fill();
                this.ctx.closePath();

                // this.ctx.lineTo(this.maxWidth, point[this.TOTALPOINTS - 1].y);
                // this.ctx.lineTo(this.maxWidth, 135);
                // this.ctx.lineTo(0, 135);
                // this.ctx.fill();
                // this.ctx.closePath();

                // for (i=0; i<this.TOTALPOINTS; i++) {
                //     dx = this.mouseX - point[i].x;
                //     dy = (this.mouseY - this.stageHeight) / 2;
                //     dist = Math.sqrt(dx * dx + dy * dy) * 0.01;
                //     my = (this.mouseY / dist) + this.stageHeightHalf;

                //     point[i].vy += (my - point[i].y + gap) * spring;
                //     point[i].vy *= this.FRICTION;
                //     point[i].y += point[i].vy;

                //     cx = (prevx + point[i].x) * .5;
                //     cy = (prevy + point[i].y) * .5;
                //     this.ctx.bezierCurveTo(prevx, prevy, cx, cy, cx, cy, point[i].x, point[i].y);
                    
                //     prevx = point[i].x;
                //     prevy = point[i].y;

                //     this.ctx.arc(point[i].x, point[i].y, 10, 0, 2 * Math.PI);
                    
                // }
                // this.ctx.lineTo(this.maxWidth, point[this.TOTALPOINTS - 1].y);
                // this.ctx.lineTo(this.maxWidth, 135);
                // this.ctx.lineTo(0, 135);
                // this.ctx.fill();
                // this.ctx.closePath();

                // for (i=0; i<this.TOTALPOINTS; i++) {
                //     dx = this.mouseX - point[i].x;
                //     dy = (this.mouseY - this.stageHeight) / 2;
                //     dist = Math.sqrt(dx * dx + dy * dy) * 0.01;
                //     my = (this.mouseY / dist) + this.stageHeightHalf;

                //     point[i].vy += (my - point[i].y + gap) * spring;
                //     point[i].vy *= this.FRICTION;
                //     point[i].y += point[i].vy;

                //     cx = (prevx + point[i].x) * .5;
                //     cy = (prevy + point[i].y) * .5;
                //     this.ctx.bezierCurveTo(prevx, prevy, cx, cy, cx, cy, point[i].x, point[i].y);

                //     prevx = point[i].x;
                //     prevy = point[i].y;
                // }
                // this.ctx.lineTo(prevx, prevy);
                // this.ctx.lineTo(this.maxWidth, this.stageHeight);
                // this.ctx.lineTo(point[0].x, this.stageHeight);
                // this.ctx.fill();
                // this.ctx.closePath();
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
                this.last_known_scroll_position = window.scrollY;
                var ticking = false;
                

                // console.log(this.last_known_scroll_position)
                this.section.forEach((sec, i) => {
                    if(sec.offsetTop < this.last_known_scroll_position-132){
                        console.log("section " + i)
                        sec.over = true;
                        sec.classList.add('scrolled');
                    }else{
                        this.current_section = i;
                        sec.over = false;
                    }

                    // if(this.section.over){
                    //     this.slope += -i;
                    // }
                });

                // if (window.scrollY > this.last_known_scroll_position ){
                //     this.slope += -this.current_section * 0.2;
                // }else{
                //     this.slope += this.current_section * 0.2;
                // }
                // this.last_known_scroll_position = window.scrollY;

                // for (var i=0; i<this.TOTALWAVE; i++) {
                //     for (var k=0; k<this.TOTALPOINTS; k++) {
                //         var point = {x: this.maxWidth / (this.TOTALPOINTS - 1) * k - this.widthGap, y:this.stageHeightHalf, vy:this.last_known_scroll_position};
                //         this.points[i][k] = point;
                //     }
                // }
                
                // this.container.style.top = 132+this.last_known_scroll_position + 'px';
                // if (!ticking) {
                //     window.requestAnimationFrame(function() {
                //         console.log(this.last_known_scroll_position)
                //         // doSomething(this.last_known_scroll_position);
                //         this.canvas.height = this.last_known_scroll_position;
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