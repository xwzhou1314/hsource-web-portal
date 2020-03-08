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
    // 验证
    this.$http({
      url: this.$http.adornUrl('api/auth/verify'),
      method: 'get'
    }).then((resp) => {
      this.user = resp.data
    })
  },
  methods: {
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
