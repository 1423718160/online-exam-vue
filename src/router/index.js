/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-spacing */
/* eslint-disable standard/object-curly-even-spacing */
import Vue from 'vue'
import Router from 'vue-router'
import ExamList from '@/components/ExamList'
import ResultList from '@/components/ResultList'
import QuestionsList from '@/components/QuestionsList'
import PageList from '@/components/PageList'
import StudentList from '@/components/StudentList'
import TeacherList from '@/components/TeacherList'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)
export default new Router({
  
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'enter',
      component: Login
    },

    {
      path: '/home',
      name: '竞赛系统',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [
        {path: '/questions/randomQuestionById', component: ExamList , name: '考试' },
        {path: '/result', component: ResultList , name: '成绩查询' }, 
        {path: '/student', component: StudentList, name: '学生信息' },
        {path: '/teacher', component: TeacherList , name: '教师信息' },
        {path: '/questions', component: QuestionsList , name: '题库信息' },
        {path: '/page', component: PageList , name: '考卷信息' },
        {path: '/login', component: Login , name: '登录' }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
  ]
  
})
