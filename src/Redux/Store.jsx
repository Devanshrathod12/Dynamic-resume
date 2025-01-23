import {configureStore} from "@reduxjs/toolkit"
import useReduser from "./ReduxSlice"

const store = configureStore({
    reducer:{
        user:useReduser
    }
})

export default store