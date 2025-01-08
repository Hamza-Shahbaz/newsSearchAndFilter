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
        setNewsOutlet: (state, action) => {
            console.log("Action payload", action.payload);
            state.selectedOutlet = action.payload;
        }
    }
})
export const {setPreference, reducePreference, setNewsOutlet} = userSlice.actions
export default userSlice.reducer
 