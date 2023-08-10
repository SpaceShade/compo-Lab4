import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import StudentListview from '@/views/StudentListview.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'

import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue
    },
    {
      path: '/Student',
      name: 'StudentList',
      component: StudentListview
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      children: [
        {
          path:'',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          props: true,
          component: EventEditView

        },
        {
          path: 'register',
          name: 'event-register',
          props: true,
          component: EventRegisterView

        },

      ]

    }
    ,
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
      
    }
    ,
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
      
    }
  ]
  
})
router.beforeEach(()=>{
  NProgress.start()
})

router.beforeEach(()=>{
  NProgress.done()
})
export default router
