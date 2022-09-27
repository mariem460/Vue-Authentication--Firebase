import { createRouter, createWebHistory} from 'vue-router'
import Home from './components/Pages/home.vue'
import SignIn from './components/User/signin.vue'
import Dashboard from './components/User/dashboard.vue';
import Store from './Store' 


const routes = createRouter({
    history:createWebHistory(),
    routes:[
        { part:'/',component: Home },
        { path:'/signin', component: SignIn, meta:{sigin: true} },
        { path:'/dashboard', component: Dashboard, meta:{dashboard: true} },
    ]
});

routes.beforeEach((to, from, next)=> {
    Store.dispatch('autoLogin').then(()=> {
        if (to.meta.auth && !Store.getters.isAuth) {
            next('/signin')
            
        } else if(to.meta.signin && !Store.getters.isAuth) {
            next('/dashboard')
            
        }else{
           next()
    
        }

    })
    

})



export default routes;