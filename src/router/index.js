import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import TableSituation from '@/components/maindu/TableSituation'
import StudentPoto from '@/components/maindu/StudentPoto'
import BasicInform from '@/components/maindu/BasicInform'
import TeacherInform from '@/components/TeacherInform'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    { path: '/TeacherInform', component: TeacherInform, name: 'TeacherInform' },
    {
      path: '/.',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        { path: '/TableSituation', component: TableSituation, name: 'TableSituation' },
        { path: '/StudentPoto', component: StudentPoto, name: 'StudentPoto'},
        { path: '/BasicInform', component: BasicInform, name: 'BasicInform'}
      ]
    }
  ]
})