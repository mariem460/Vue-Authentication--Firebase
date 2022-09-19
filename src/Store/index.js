import { createStore } from "vuex";
import userModule from "./users/userModule";

const Store = createStore({
    modules:{
        user: userModule
    }
})


export default Store