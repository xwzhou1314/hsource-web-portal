import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'iview'
import Index from '@/components/index/Index'

// 公共区域
// import CommonHeader from '@/components/header/CommonHeader';
import SimpleHeader from '@/components/header/SimpleHeader/SimpleHeader'
import CommonFooter from '@/components/footer/CommonFooter'

// 首页
import ArticleListContent from '@/components/content/ArticleListContent'
import InvitationPageContent from '@/components/content/InvitationPageContent'

// 登录
import Login from '@/components/login/login'
// 注册
import register from '@/components/login/register'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '快乐源泉'
          }
        },
        {
          path: 'article/:articleId',
          name: 'article',
          components: {
            header: SimpleHeader,
            content: InvitationPageContent,
            footer: CommonFooter
          },
          meta: {
            title: '快乐源泉'
          }
        },
        {
          path: 'login/',
          name: 'login',
          components: {
            content: Login
          },
          meta: {
            title: '快乐源泉'
          }
        },
        {
          path: 'register/',
          name: 'register',
          components: {
            content: register
          },
          meta: {
            title: '快乐源泉'
          }
        }
      ]
    }
  ]
})

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
