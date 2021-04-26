const load = (page) => {
  return () => import(`@/pages/${page}.vue`)
}

export const RouteNames = {
  HOMEPAGE: 'homepage',
  NOT_FOUND: '404'
}

const routes = [
  {
    path: '',
    name: RouteNames.HOMEPAGE,
    component: load('Homepage/Homepage')
  },
  {
    path: '404',
    name: RouteNames.NOT_FOUND,
    component: load('404/404')
  }
]

export default routes
