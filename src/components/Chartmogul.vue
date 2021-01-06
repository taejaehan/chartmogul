<template>
    <div>
      <ChartmogulOrigin class="chartmogul-container page-front page-base has-affix" ></ChartmogulOrigin>
      <CanvasEffect id="canvas_container" class="canvas-container" ></CanvasEffect>
    </div>
</template>

<script>
import ChartmogulOrigin from './ChartmogulOrigin.vue';
import CanvasEffect from './CanvasEffect.vue';
export default {
  name: 'App',
  components: {
    ChartmogulOrigin,
    CanvasEffect,
  },
}
</script>

<style>
  .chartmogul-container{
      margin-top:132px;
      z-index: 3;
      background:none;
      position: relative
  }
  .canvas-container{
      width:100%;
      height: 100%;
      z-index: 2;
      position: fixed;
      top: 0;
      left: 0;
      -webkit-transition:top 0.1s;
  }
  .hero.banner, .hero.section{
    background:none !important;
  }
  .hero--front{
    background:none !important;
  }
  .hero-tagline, .hero-description{
    color:black !important;
  }
  .hero--front .hero__content .hero-textual .btn-block .btn-text--more{
    color:black !important;
  }
  .page-front .section--partners{
    /* background:none; */
    opacity: 0.8;
  }
  .page-front .hero-addendum .container{
    /* background:none; */
    opacity: 0.8;
  }
  section{
    /* border:1px solid black;
    border-top:3px solid red; */
    margin:0 !important;
  }
  @media (min-width: 768px){
    .hero--front .hero__content {
        margin-top: 0 !important;
    }
    .chartmogul-container{
      margin-top:106px;
    }
  }
</style>