<template>
    <div class="container">
       <div class="content sign">
          
          <form @submit.prevent="onSubmit">
            <h1>Sign in</h1>
           
              <div class="input_field">
                  <label>Email</label>
                  <input type="email" v-model="formdata.email"/>
              </div>

              <div class="input_field">
                  <label>Password</label>
                  <input type="password" v-model="formdata.password" />
              </div>
              
              <button>
                <span v-if="type">sign in </span>
                <span v-else> sign up </span>
              </button>

              <div class="change_type" @click="type =!type">
                <span v-if="type"> I want to sign up. </span>
                <span v-else> I want to sign in. </span>
          

               
              </div>

          </form>

        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                type:true,// true: signin || false: signup
                formdata:{
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit () {
              if(this.type){
                console.log("signin")
                this.$store.dispatch('signin', this.formdata )
   
              }else{
                console.log("signup")
                this.$store.dispatch('signup', this.formdata)

              }
            },
       
        },
      
         

    }
</script>
