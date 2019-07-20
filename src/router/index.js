import Vue from 'vue'
import Router from 'vue-router'
import PageView from "../components/PageView"
import FirstCourse from '../components/FirstCourse'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'PageView',
            component: PageView
        },
        {
            path: '/firstCourse',
            name: 'FirstCourse',
            component: FirstCourse
        }
    ]
})
