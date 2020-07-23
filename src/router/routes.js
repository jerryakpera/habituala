
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { 
        path: '', 
        component: () => import('pages/PageHome.vue') ,
        meta: {
          requiresAuth: true
        }
      },
      { 
        path: '/tasks', 
        component: () => import('pages/PageTodo.vue') ,
        meta: {
          requiresAuth: true
        }
      },
      { 
        path: '/vocab', 
        component: () => import('pages/PageVocab.vue') ,
        meta: {
          requiresAuth: true
        }
      },
      { 
        path: '/settings', 
        component: () => import('pages/PageSettings.vue'),
        meta: {
          requiresAuth: true
        }
      },
      { 
        path: '/retrosect', 
        component: () => import('pages/PageRetrosect.vue'),
        meta: {
          requiresAuth: true
        }
      },
      { 
        path: '/journals', 
        component: () => import('pages/PageJournal.vue'),
        meta: {
          requiresAuth: true
        }
      },
      { 
        path: '/profile', 
        component: () => import('pages/PageProfile.vue'),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Landing.vue'),
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
