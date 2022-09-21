const API_Key = 'AIzaSyArd4a0CnWru4el9r-KeV6MuR-guIKmQZI';
import axios from "axios";
import router from '../../routes'

const userModule = {
    state(){
        return {
            email:'',
            token:'',
            refresh: ''
          
        }
    },
    mutations:{
       authUser(state, payload){
        state.email = payload.email,
        state.token = payload.idToken,
        state.refresh = payload.refreshToken
       },
       resetAuth(state){
        state.email = null;
        state.token = null;
        state.refresh = null;

       }
    },
    actions:{
        removeToken(){
            localStorage.removeItem('token'),
            localStorage.removeItem('refresh')

        },
        setToken(context, payload){
            localStorage.setItem('token', payload.idToken),
            localStorage.setItem('refresh', payload.refreshToken)
        },
        signin(context, payload){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_Key}`,{
                ...payload,
                returnSecureToken:true

            }).then(response=> {
                console.log(response.data)
                context.commit('authUser', response.data)
                context.dispatch('setToken', response.data)
            }).catch(err=> 
                console.log(err))
        },

        signup(context, payload){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_Key}`,{
                ...payload,
                returnSecureToken:true
            }).then(response=> {
                console.log(response.data)
                context.commit('authUser', response.data)
                context.dispatch('setToken', response.data)
            }).catch(err=> 
                console.log(err))

        },
        signOut(context){
            context.commit('resetAuth');
            context.dispatch('removeToken')
            router.push('/')
            //when user is signed out it will be token immediatly to Home

        }
    }
}
export default userModule