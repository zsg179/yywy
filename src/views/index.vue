<template>
  <div class="container">
    <swiper :options="swiperOption" v-if="imgList.length">
      <swiper-slide v-for="item of imgList" :key="item.id">
              <img class="slide-img" :src="item.picUrl"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="btn-wrapper">
        <div class="btn">
            算一算这笔钱
        </div>
    </div>
    
  </div>
</template>


<script>
  //swiper轮播插件 
  import 'swiper/css/swiper.css';
  import {Swiper, SwiperSlide } from 'vue-awesome-swiper'
  export default {
    // 注册组件
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        // 图片列表
        imgList: [
        {
          'picUrl': require("../assets/img/tips0.png")
        }, 
        {
          'picUrl': require("../assets/img/tips1.png")
        },
        {
          'picUrl': require("../assets/img/tips2.png")
        },
        {
          'picUrl': require("../assets/img/tips3.png")
        },
        {
          'picUrl': require("../assets/img/tips4.png")
        }
        ],
        // 配置属性
        swiperOption: {
          direction: 'horizontal', // 滑动的方向(水平方向)
          loop: true, // 是否循环
          autoplay: {
              disableOnInteraction: false,//触碰后不停止自动播放
          },//默认3s切换
          slidesPerView: 'auto', // 设置可视区一共显示几张图片,设置auto,设置auto为自适应;
          centeredSlides: true, // 设置为true时,带有active-slide类名的图片会居中
          spaceBetween: 4, //  每张图片之间的间隔
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    }

  }
</script>

<style lang="less">
@import '../assets/css/index.css';
</style>