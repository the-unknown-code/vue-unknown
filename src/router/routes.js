const load = (page) => () => import(`@/pages/${page}.vue`)

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
    path: RouteNames.NOT_FOUND,
    name: RouteNames.NOT_FOUND,
    component: load('NotFound/NotFound')
  }
]

export default routes
