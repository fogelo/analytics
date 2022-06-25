import {createStore} from "vuex";
import {analyticsModule} from "./analyticsModule";

export default createStore({
    modules: {
        analytics: analyticsModule
    }
})