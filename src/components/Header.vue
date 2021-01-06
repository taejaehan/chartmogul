<template>
  <div id="header" class="" >
      <div class="header-container">
        <a href="/" class="logo-container" aria-label="home" style="user-select: auto;">
        <img src="@/assets/wordmark.svg" alt="" class="logo" style="user-select: auto;">
        </a>
        <ul>
            <a href="/"><li>Product</li></a>
            <a href="/"><li>Customers</li></a>
            <a href="/"><li>Pricing</li></a>
            <a href="/"><li>Resources</li></a>
            <a href="/"><li>Company</li></a>
            <a href="/"><li>Login</li></a>
        </ul>
        <button class="nav-mobile-open" aria-label="Open Mobile Menu" style="user-select: auto;"> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" id="icon-mobile-menu">
          <path d="M1 6h18a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0-6h18a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0 12h18a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z">
          </path>
          </svg>
        </button>
      </div>
  </div>
</template>
 
<script>
export default {
  name: 'AppHeader',
  data:function(){
    return {
      user_type:"",
      user_name:"",
      belongto:"",
    }
  },
  //props: ['menu'],
  methods: {
  }
}
</script>
 
<style scoped>
    #header{
        position: fixed;
        top:0;
        left:0;
        background: white;
        width:100%;
        padding-top: 45px;
        padding-bottom: 40px;
        z-index: 5;
    }
    .header-container{
        width: 100%;
        max-width: 100%;
        padding-right: 50px;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .logo-container{
        float: left;
    }
    .logo{
        top: 24px;
        height: 30px;
    }
    ul{ 
        position: relative;
        float: right;
        font-size: 16px;
        font-weight: 400;
        display: block;
        margin-top:5px;
    }
    li{
        padding-right: 27px;
        padding-left: 27px;
        border-bottom-width: 0;
        background-color: transparent;
        -webkit-transition: all .3s ease,opacity .3s ease;
        transition: all .3s ease,opacity .3s ease;
        font-weight: 400;
        list-style-type: none;
        display: inline-block;
    }
    button{
      width:46px;
      float: right;
      display: none;
    }
    @media (min-width: 992px){
      #header{
        padding-top: 30px;
        padding-bottom: 25px;
      }
    }
    @media (max-width:768px) {
      #header{
        padding-top: 30px;
        padding-bottom: 25px;
      }
      .header-container{
          padding-right: 3%;
          padding-left: 3%;
      }
      .hero--front .hero__content .hero-video{
        height: 100%;
      }
      ul{
        display: none;
      }
      button{
        display: block;
      }
    }
</style>
