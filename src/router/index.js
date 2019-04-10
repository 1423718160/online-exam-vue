import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SchoolList from '@/components/SchoolList'
import CompanyList from '@/components/CompanyList'
import StudentList from '@/components/StudentList'
import SchoolInfo from '@/components/SchoolInfo'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '管理系统',
      component: Home,
      children: [
        {path: '/school', component: SchoolList , name: '高校列表' },
        {path: '/company', component: CompanyList , name: '公司列表' }, 
        {path: '/student', component: StudentList , name: '学生列表' }
      ]
    },
    {
      path: '/echarts',
      name: 'ECHARTS',
      component: SchoolInfo
    }
  ]
})
