import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        source : "",
        category : "",
        author : "",
        selectedOutlet : "NewsApi.AI"
    },
    reducers : {
        setPreference : (state, action) => {
            state[action.payload.type] = action.payload.value
        },
        reducePreference: (state, action) => {
            const { type, value } = action.payload;
            state[type] = "";
        },
        clearPreferences: (state) => {
            state.source = "";
            state.category = "";
            state.author = "";
        },
        setNewsOutlet: (state, action) => {
            state.selectedOutlet = action.payload;
        }
    }
})
export const {setPreference, reducePreference, setNewsOutlet, clearPreferences} = userSlice.actions
export default userSlice.reducer
 