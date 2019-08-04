import Vue from 'vue'
import Router from 'vue-router'
import PageView from "../components/PageView"
import FirstCourse from '../components/FirstCourse'
import AnalysisPage from '../components/AnalysisPage'
import HeatMap from '../components/HeatMap'

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            name: 'HeatMap',
            component: HeatMap
        },
        // {
        //     path: '/',
        //     name: 'AnalysisPage',
        //     component: AnalysisPage
        // },
        {
            path: '/firstCourse',
            name: 'FirstCourse',
            component: FirstCourse
        },
        // {
        //     path: '/page',
        //     name: 'AnalysisPage',
        //     component: AnalysisPage
        // }
    ]
})
