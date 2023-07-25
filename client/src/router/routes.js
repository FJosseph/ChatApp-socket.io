
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  {
    path: '',
    component: () => import('pages/IndexPage.vue'),
    children: [
      { path: '/chatapp', component: () => import('pages/ChatPage.vue'), meta: {requiredAuth: true} },
      { path: '/login', component: () => import('pages/LoginPage.vue'),  }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('pages/LoginPage.vue'),
  // },
  {
    path: '/test',
    component: () => import('pages/TestPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
