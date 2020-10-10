import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import NotFound from '../views/NotFound.vue';

import Dashboard from '../views/dashboard/Dashboard.vue';

import CharacterDetail from '../views/dashboard/CharacterDetail.vue';
import ComicDetail from '../views/dashboard/ComicDetail.vue';

import CharactersByComic from '../components/CharactersByComic.vue';
import StoriesByComic from '../components/StoriesByComic.vue';

import ComicsByCharacter from '../components/ComicsByCharacter.vue';
import StoriesByCharacter from '../components/StoriesByCharacter.vue';


import LikeComics from '../components/LikeComics.vue';
import LikeCharacters from '../components/LikeCharacters';

import ListComics from '../views/dashboard/ListComics.vue';
import ListCharacters from '../views/dashboard/ListCharacters.vue';
import ListLikes from '../views/dashboard/ListLikes.vue';

import { auth } from '../fb/index'
Vue.use(VueRouter);




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      // will match everything
      path: '*',
      component: NotFound
  
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: { name: 'SignIn'}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      redirect: { name: 'ListCharacters'},
      meta: { requiresAuth: true }
    },
    {
      path: '/list-comics',
      name: 'ListComics',
      component: ListComics,
      meta: { requiresAuth: true }
    },
    {
      path: '/list-likes',
      name: 'ListLikes',
      component: ListLikes,
      redirect: { name: 'LikeCharacters'},
      meta: { requiresAuth: true },
      children: [
        {
          path: '/like-comics',
          name: 'LikeComics',
          component: LikeComics,
        },
        {
          path: '/like-characters',
          name: 'LikeCharacters',
          component: LikeCharacters,
        },

      ]
    },
       
   
    {
      path: '/comic/:id',
      name: 'ComicDetail',
      component: ComicDetail,
      meta: { requiresAuth: true },
      redirect: { name: 'CharactersByComic'},
      children: [
        {
          path: '/comic/:id/characters',
          name: 'CharactersByComic',
          component: CharactersByComic,
        },
        {
          path: '/comic/:id/stories',
          name: 'StoriesByComic',
          component: StoriesByComic,
        },

      ]
    
    },
    {
      path: '/character/:id',
      name: 'CharacterDetail',
      component: CharacterDetail,
      meta: { requiresAuth: true },
      redirect: { name: 'ComicsByCharacter'},
      children: [
        {
          path: '/character/:id/comic',
          name: 'ComicsByCharacter',
          component: ComicsByCharacter,
        },
        {
          path: '/character/:id/stories',
          name: 'StoriesByCharacter',
          component: StoriesByCharacter,
        },

      ]
    },
    {
      path: '/list-characters',
      name: 'ListCharacters',
      component: ListCharacters,
      meta: { requiresAuth: true }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    
  ]  
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next({ name: 'SignIn'})
  } else if (to.name === 'SignIn' && auth.currentUser || to.name === 'SignUp' && auth.currentUser) {
    next({ name: 'Dashboard'})
  }
   else {
    next()
  }
})

export default router;
