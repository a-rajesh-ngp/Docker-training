import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useAuthStore } from "../stores/auth.store"

export function authGaurd(to, from, next) {
    if(!to.meta.requiresAuth) {
        return next()
    }
    
    const token = Cookies.get('access_token')
    if(!token) {
        return next('/login')
    }

    try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000
        if(decoded.exp < now) {
            Cookies.remove('access_token')
            return next('/login')
        }
        
        const authStore = useAuthStore()
        if(!authStore.user) {
            authStore.user = decoded
            authStore.token = token
        } 
        next()
    } catch(err) {
        Cookies.remove('access_token')
        next('/login')
    }
}