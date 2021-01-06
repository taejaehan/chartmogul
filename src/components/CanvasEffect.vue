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
                slope : .024,
                maxWidth : 0,
                widthGap : 0,
                last_known_scroll_position : 0,
                current_section : 0,
                isDown : 0, mouseX : 0, mouseY : 0,
                points : [], isShowPoint : 0,
                isColor : 0,
                STIFF : 0.1,
                MAX_STRENTH : 0.7,
                FRICTION : 0.87,
                TOTALWAVE : 3,
                TOTALPOINTS : 8,
                // COLORS : [
                //     [   
                //         [
                //             {h:0, s:0, l:100}
                //         ],
                //         [
                //             {h:204, s:25, l:25}
                //         ],
                //         [
                //             {h:37, s:56, l:94}
                //         ],
                //         [
                //             {h:0, s:0, l:100}
                //         ],
                //         [
                //             {h:37, s:56, l:94}
                //         ],
                //         [
                //             {h:0, s:0, l:100}
                //         ],
                //     ],
                //     [
                //         {h:0, s:100, l:50},
                //         {h:60, s:100, l:50},
                //         {h:180, s:100, l:50}
                //     ]],
                COLORS : [
                    [   
                        {h:190, s:90, l:70},
                        {h:196, s:70, l:30},
                        {h:207, s:24, l:24}
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
            this.section = [...document.getElementsByTagName('section')];
            this.canvas = document.getElementsByTagName('canvas')[0];
            // this.canvas.width = this.stageWidth * 2;
            // this.canvas.height = this.stageHeight * 2;
            // this.ctx.scale(2,2);

            this.container = document.getElementById('canvas_container');
            window.addEventListener('resize', this.onResize, true);
            this.onResize();

            this.start();
        },
        methods:{
            onResize() {
                this.stageWidth = window.innerWidth;
                this.stageHeight = window.innerHeight;

                this.stageWidthHalf = this.stageWidth >> 1;
                this.stageHeightHalf = this.stageHeight / 1.4;

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
                        point = {x: this.maxWidth / (this.TOTALPOINTS - 1) * k - this.widthGap, y:this.stageHeightHalf, vy:0};
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

                if(this.current_section > 1) return;

                this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
                
                
                var i, arr = [0, 5, -5];
                for (i=0; i<this.TOTALWAVE; i++) {
                    
                    // var afterColor = this.COLORS[this.isColor][this.current_section+1][i];
                    // this.ctx.fillStyle = 'hsla(' + afterColor.h + ', ' + afterColor.s + '%, ' + afterColor.l + '%, 1)';
                    // this.ctx.beginPath();
                    // this.ctx.rect(0, 0, this.stageWidth, this.stageHeight);
                    // this.ctx.fill();
                    // this.ctx.closePath(); 

                    this.draw(this.points[i], this.COLORS[this.isColor][i], this.SPRING[i], arr[i]);
                    // this.draw(this.points[i], this.COLORS[this.isColor][this.current_section][i], this.SPRING[i], arr[i]);
                }

                if (this.isShowPoint) {
                    this.drawPoints(this.points[0], '#fff');
                }

            },
            draw(point, color, spring, gap) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'hsla(' + color.h + ', ' + color.s + '%, ' + color.l + '%, 0.9)';
                // this.ctx.fillStyle = "#314451";
                // this.ctx.fillStyle = "rgba(49,68,81,1)"

                var moveY = window.scrollY;
                var mouseAndScollY = this.mouseY;
                if(this.current_section > 9 ){
                    moveY = 0;
                    mouseAndScollY -= window.scrollY;
                }
                var prevx = point[0].x;
                var prevy = point[0].y - moveY;
                var i, dx, dy, dist, my, cx, cy;

                // var mouseAndScollY = this.mouseY - window.scrollY;
                
                this.ctx.moveTo(prevx, prevy);
                for (i=1; i<this.TOTALPOINTS; i++) {

                    dx = this.mouseX - point[i].x;
                    dy = mouseAndScollY - point[i].y;
                    dist = Math.sqrt(dx * dx + dy * dy) * this.STIFF;
                    
                    // if(mouseAndScollY < point[i].y){
                    //     my = (mouseAndScollY / dist) + this.stageHeightHalf - (window.scrollY*this.slope*i);
                    // }else{
                    //     my = -(mouseAndScollY / dist) + this.stageHeightHalf - (window.scrollY*this.slope*i);
                    // }
                    
                    if(mouseAndScollY < point[i].y){
                        my = (mouseAndScollY / dist * this.MAX_STRENTH) + this.stageHeightHalf - 20*i;
                    }else{
                        my = -(mouseAndScollY / dist * this.MAX_STRENTH) + this.stageHeightHalf - 20*i;
                    }
                    
                    point[i].vy += (my - point[i].y + gap + i) * spring;
                    point[i].vy *= this.FRICTION;
                    point[i].y += point[i].vy;

                    cx = (prevx + point[i].x) * .5;
                    cy = (prevy + point[i].y) * .5;
                    this.ctx.lineTo(prevx, prevy, cx, cy, cx, cy, point[i].x, point[i].y - moveY);
                    // this.ctx.bezierCurveTo(prevx, prevy, cx, cy, cx, cy, point[i].x, point[i].y); 
   
                    prevx = point[i].x;
                    prevy = point[i].y - moveY;

                    point[i].y += point[i].vy;
                }
                this.ctx.lineTo(prevx, prevy);
                // this.ctx.lineTo(this.maxWidth, this.stageHeight);
                // this.ctx.lineTo(point[0].x, this.stageHeight);
                this.ctx.lineTo(this.maxWidth, 0);
                this.ctx.lineTo(point[0].x, 0);
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
                this.last_known_scroll_position = window.scrollY;
                var ticking = false;
                var cs = 0;
                this.section.forEach((sec, i) => {
                    if(sec.offsetTop < this.last_known_scroll_position-132){
                        sec.classList.add('scrolled');
                    }
                    // if(sec.offsetTop < this.last_known_scroll_position-132 + this.stageHeight - this.stageHeightHalf){
                    //     cs = i;
                    // }
                    if(sec.offsetTop < this.last_known_scroll_position+100 + this.stageHeight - this.stageHeightHalf){
                        cs = i;
                    }
                    
                });

                this.current_section = cs;
            }
        }
    }
</script>

<style>

    canvas{
        z-index: 2;
    }
</style>