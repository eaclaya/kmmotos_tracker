import {createRouter, createWebHistory} from 'vue-router'
import Tracker from '../Tracker.vue'
import Detail from '../Detail.vue'
import Login from '../Login.vue'
import PageNotFound from '../PageNotFound.vue'
import auth from '../middleware/auth'
import log from '../middleware/log'

const routes = [
	{
		path: '/',
		name: 'Tracker',
		component: Tracker,
	},
	{
		path: '/detail',
		name: 'Detail',
		component: Detail,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
	    path: '/:catchAll(.*)*',
	    name: "PageNotFound",
	    component: PageNotFound,
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router;