import Main from '../pages/main.vue'
import Catalog from '../pages/catalog.vue'
import Company from '../pages/company.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/catalog', component: Catalog },
    { path: '/company', component: Company }
]

export default routes;