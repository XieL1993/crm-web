import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'

Vue.use(Router)
/* 常量路由 */
export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  }
]
export const errorRouter = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export const subRouter = [
  {
    name: '注册商机',
    path: '/opportunity/add',
    component: resolve => {
      import('../subpages/opportunity/add').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '商机修改',
    path: '/opportunity/edit',
    component: resolve => {
      import('../subpages/opportunity/edit').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '商机详情',
    path: '/opportunity/detail',
    component: resolve => {
      import('../subpages/opportunity/detail').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '新建活动',
    path: '/activity/add',
    component: resolve => {
      import('../subpages/activity/add').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '活动修改',
    path: '/activity/edit',
    component: resolve => {
      import('../subpages/activity/edit').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '活动详情',
    path: '/activity/detail',
    component: resolve => {
      import('../subpages/activity/detail').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '新建合同',
    path: '/contract/add',
    component: resolve => {
      import('../subpages/contract/add').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '编辑合同',
    path: '/contract/edit',
    component: resolve => {
      import('../subpages/contract/edit').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '新建收款',
    path: '/invoice/add',
    component: resolve => {
      import('../subpages/invoice/add').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '收款修改',
    path: '/invoice/edit',
    component: resolve => {
      import('../subpages/invoice/edit').then(module => {
        resolve(module)
      })
    },
    hidden: true
  },
  {
    name: '收款详情',
    path: '/invoice/detail',
    component: resolve => {
      import('../subpages/invoice/detail').then(module => {
        resolve(module)
      })
    },
    hidden: true
  }
]
export default new Router({
  scrollBehavior() {
    return { y: 0 }
  },
  routes: constantRouterMap
})
