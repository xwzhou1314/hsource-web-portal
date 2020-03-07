<template>
  <div class="simple-header">
    <transition name="slide-fade">
      <div id="mobile-bar" v-show="show" >
        <a class="menu-button" ref="menubutton"></a>
        <router-link class="logo" to="/"></router-link>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="header"  v-show="show">
    <router-link id="logo" to="/">
      <img src="../../../assets/logo.png">
      <span class="title">快乐源泉</span>
      <span class="motto">专治不开心，我的快乐源泉</span>
    </router-link>
    <ul id="nav">
      <iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=10" width="300" height="25" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" ></iframe>
      <li v-if="user && user.name"><span  class="nav-link contribute">你好呀！ {{user.name}}</span></li>
      <li v-else><a :href="'/login'">登录</a></li>
    </ul>
    </div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
import SideBar from '@/components/header/SimpleHeader/SideBar'
export default {
  components: {
    'sidebar': SideBar
  },
  data () {
    return {
      show: true,
      articleCategoryList: [],
      bookCategoryList: [],
      keywords: '',
      username: '',
      password: '',
      user: null
    }
  },
  created () {
    this.listCategory()
    this.keywords = this.$route.query.keywords
    this.username = 'lisi'
    this.password = '123'

    // 验证
    this.$http({
      url: this.$http.adornUrl('api/auth/verify'),
      method: 'get'
    }).then((resp) => {
      console.log(resp.data)
      this.user = resp.data
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initMobileMenu()
    })
    // 给页面绑定滑轮滚动事件
    if (document.addEventListener) { // firefox
      document.addEventListener('DOMMouseScroll', this.watchScroll, false)
    }
    // 滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.watchScroll
  },
  methods: {
    // 登录
    login () {
      this.$http({
        url: this.$http.adornUrl('api/auth/login?username=' + this.username + '&password=' + this.password),
        params: this.$http.adornParams(this.username, this.password),
        method: 'post'
      }).then(({data}) => {
      })
    },
    initMobileMenu () {
      // 显示手机端的菜单
      var sidebar = this.$refs.sidebar
      this.$refs.menubutton.addEventListener('click', function () {
        sidebar.toggleSideBar()
      })
    },
    watchScroll (e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
   // 添加导航栏显示动画
  .slide-fade-enter-active ,.slide-fade-leave-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-to ,.slide-fade-enter {
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-70px);
    opacity: 0;
  }
</style>
