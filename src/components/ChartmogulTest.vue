<template>
  <div role="main" class="main">
    <section class="section hero-addendum scrolled" >
        <h1>abc</h1>
    </section>
    <section class="section section--pitch first scrolled">
        <h1>abc</h1>
    </section>
    <section class="section section--pitch section--partners" >
        <h1>abc</h1>
    </section>
    <section class="section section--testimonial">
        <h1>abc</h1>
    </section>
    <section class="section section-cta" >
    </section>
</div>
</template>

<script>
    export default {
        name: 'ChartmogulTest',
    }
</script>

<style>
 
    section:nth-child(odd){
        background-color:blue;
    }
    section:nth-child(even){
        background-color:red;
    }

    section{
        min-height: 600px;
        /* opacity: 0.3; */
        background:none !important;
    }
</style>