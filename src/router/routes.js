
export default [
  {
    path: '/',
    component: () => import('layouts/login'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('layouts/signup')
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: () => import('layouts/dashboard')
  // },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
