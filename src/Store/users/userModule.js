const API_Key = 'AIzaSyArd4a0CnWru4el9r-KeV6MuR-guIKmQZI';
import axios from "axios";
import router from '../../routes'

const userModule = {
    state(){
        return {
            email:'',
            token:'',
            refresh: '',
            loading: true,
            error: [false, '']
           
          
        }
    },
    getters:{
        isAuth(state){
            if(state.email){
                return true
            }
            return  false
        },
        getError(state){
            return state.error

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

       },
       setError(state, payload){
        state.error = [true, payload]

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
                router.push('/dashboard')
            }).catch(err=> 
                console.log(err))
                context.commit('setError', 'Ooops! something went wrong.')
        },

        signup(context, payload){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_Key}`,{
                ...payload,
                returnSecureToken:true
            }).then(response=> {
                console.log(response.data)
                context.commit('authUser', response.data)
                context.dispatch('setToken', response.data)
                router.push('/dashboard')
            }).catch(err=> 
                console.log(err)
                )
                context.commit('setError', 'Ooops! Check again.')
              

        },
        signOut(context){
            context.commit('resetAuth');
            context.dispatch('removeToken')
            router.push('/')
            //when user is signed out it will be token immediatly to Home

        },
        async autoLogin(context){
            try {
                 if (context.state.loading) {
                const refreshToken = localStorage.getItem('refresh')
                if(refreshToken){
                    const token = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_Key}`,{
                        grant_type: 'refresh_token',
                        refresh_token:refreshToken

                    })
                    console.log(token.data)
                    const user = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_Key}`, {
                        idToken: token.data.id_token
                     

                    })
                    const newTokens = {
                        email:  user.data.users[0].email,
                        idToken: token.data.id_token,
                        refreshToken :token.data.refresh_token
                    }
                    context.commit('authUser', newTokens)
                    context.dispatch('setToken',newTokens)
                
            }
          
                }
            
                
            } catch (error) {
                console.log(error)
        
                
            }finally {
                context.state.loading = false;

            }

        }
    }
}
export default userModule