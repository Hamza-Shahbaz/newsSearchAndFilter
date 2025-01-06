import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        source : [],
        category : [],
        author : []
    },
    reducers : {
        setPreference : (state, action) => {
            state[action.payload.type] = action.payload.value
        },
        reducePreference: (state, action) => {
            const { type, value } = action.payload;
            state[type] = state[type].filter(item => item.label !== value);
        },
    }
})
export const {setPreference, reducePreference} = userSlice.actions
export default userSlice.reducer
 