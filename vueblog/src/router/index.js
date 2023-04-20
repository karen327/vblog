import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import CateMana from '@/components/CateMana'
import DataCharts from '@/components/DataCharts'
import PostArticle from '@/components/PostArticle'
import UserMana from '@/components/UserMana'
import BlogDetail from '@/components/BlogDetail'
import MyHome from "@/components/MyHome"
import MyInfo from "@/components/MyInfo"
import MyBlogList from "@/components/MyBlogList"
import MyStars from "@/components/MyStars"
import RecentViews from "@/components/RecentViews"
import PersonalSettings from "@/components/PersonalSettings"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    }, {
      path: '/home',
      name: '',
      component: Home,
      hidden: true
    }, {
      path: '/home',
      component: Home,
      name: '文章管理',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/articleList',
          name: '文章列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postArticle',
          name: '发表文章',
          component: PostArticle,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/blogDetail',
          name: '博客详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editBlog',
          name: '编辑博客',
          component: PostArticle,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '用户管理',
      children: [
        {
          path: '/user',
          iconCls: 'fa fa-user-o',
          name: '用户管理',
          component: UserMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '栏目管理',
      children: [
        {
          path: '/cateMana',
          iconCls: 'fa fa-reorder',
          name: '栏目管理',
          component: CateMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '数据统计',
      iconCls: 'fa fa-bar-chart',
      children: [
        {
          path: '/charts',
          iconCls: 'fa fa-bar-chart',
          name: '数据统计',
          component: DataCharts
        }
      ]
    }, {
      path: '/personal',
      component: MyHome,
      name: '',
      hidden: true
    }, {
      path: '/personal',
      component: MyHome,
      name: '个人资料',
      children: [
        {
          path: '/info',
          iconCls: 'fa fa-user',
          name: '个人资料',
          component: MyInfo,
        }
      ]
    }, {
      path: '/personal',
      component: MyHome,
      name: '我的博客',
      children: [
        {
          path: '/blogTable',
          iconCls: 'fa fa-book',
          name: '我的博客',
          component: MyBlogList,
        }
      ]
    }, {
      path: '/personal',
      component: MyHome,
      name: '我的收藏',
      children: [
        {
          path: '/star',
          iconCls: 'fa fa-bookmark',
          name: '我的收藏',
          component: MyStars
        }
      ]
    }, {
      path: '/personal',
      component: MyHome,
      name: '最近浏览',
      children: [
        {
          path: '/recentviews',
          iconCls: 'fa fa-eye',
          name: '最近浏览',
          component: RecentViews
        }
      ]
    }, {
      path: '/personal',
      component: MyHome,
      name: '个人设置',
      children: [
        {
          path: '/settings',
          iconCls: 'fa fa-gear',
          name: '个人设置',
          component: PersonalSettings,
        }
      ]
    }
  ]
})
