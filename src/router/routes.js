const load = (page) => () => import(`@/pages/${page}.vue`)

export const RouteNames = {
  HOMEPAGE: 'homepage'
}

const routes = [
  {
    path: '',
    name: RouteNames.HOMEPAGE,
    component: load('Homepage/Homepage')
  }
]

export default routes
