<template>
  <div class="container carousel"
       id="carousel">
    <el-carousel :height="bannerHeight + 'px'"
                 :autoplay="false" :arrow="arrow" :indicator-position="indicatorPosition">
      <el-carousel-item v-for="(item, index) in banner"
                        :key="index">
        <img class="img-responsive"
             :src="item.cimg">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  props:['banner','bannerHeight','arrow','indicatorPosition'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // bannerHeight: 1000,
      screenWidth: 0,
    }
  },
  methods: {
    // setSize: function () {
    //   this.bannerHeight = 638 / 1920 * this.screenWidth;
    // },
  },
  mounted () {
    // 首次加载时,需要调用一次
    // this.screenWidth = window.innerWidth;
    // this.setSize();
    // // 窗口大小发生改变时,调用一次
    // window.onresize = () => {
    //   this.screenWidth = window.innerWidth;
    //   this.setSize();
    // }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
}
/* 图片自适应容器 */
.img-responsive {
  display: block;
  height: auto;
  width: 100%;
}
/* 覆盖ele-ui默认样式 指示器样式 */
#carousel /deep/ .el-carousel__button {
  width: 10px;
  height: 10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: transparent;
  opacity: 1;
}

#carousel /deep/ .el-carousel__indicator.is-active button {
  opacity: 1;
  background: #4c91ef;
  border: 2px solid #4c91ef;
}

#carousel /deep/ .el-carousel__indicators--horizontal {
  bottom: 3.75rem;
  left: 80%;
}
</style>
