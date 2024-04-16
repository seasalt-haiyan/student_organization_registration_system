import VueRouter from 'vue-router'

import Admin_login from '@/components/admin_login.vue'
import Student_submit from '@/components/student_submit.vue'
import Identity_choose from '@/components/identity_choose.vue'
import submit_success from '@/components/submit_success.vue'
import admin_main from '@/components/admin_main.vue'
import admin_student from '@/components/admin_student.vue'


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Identity_choose
        },
        {
            path: '/login',
            component: Admin_login
        },
        {
            path: '/student',
            component: Student_submit,
        },
        {
            path: '/success',
            component: submit_success,
        },
        {
            path: '/admin',
            component: admin_main,
            children: [
                {
                    path: 'student',
                    component: admin_student,
                }
            ]
        }
    ]
})