 
const API_Key = 'AIzaSyArd4a0CnWru4el9r-KeV6MuR-guIKmQZI';
import axios from "axios";


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


       }
    },
    actions:{
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

        }
    }
}
export default userModule