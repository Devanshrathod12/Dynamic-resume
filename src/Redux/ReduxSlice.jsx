import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {}, // data yha pr store hoga
  Dark:true    // by default dark hoga {ture} and light {false}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData(state, action) {
      state.userData = action.payload   // action payload ke ander data store hoga 
    },
    ToggleDarkMod(state,action){
          state.Dark = action.payload
    }

  },
});

export const {AddUserData,ToggleDarkMod} = userSlice.actions;
export default userSlice.reducer;


