import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/allMovies/AllMovies.vue'
import Login from '@/components/Login'
import Registration from '@/components/Registration.vue'
import Profile from '@/components/Profile.vue'
import Home from '@/components/Home'
import MovieDescription from '@/components/MovieDescription'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/movies/:id', name: 'MovieDescription', component: MovieDescription, props: true},
    {path: '/movies', name: 'Movies', component: Movies},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Registration', component: Registration},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/', name: 'Home', component: Home}
  ]
})
