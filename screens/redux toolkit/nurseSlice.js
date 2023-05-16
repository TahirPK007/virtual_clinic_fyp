const {createSlice} = require('@reduxjs/toolkit');

const nurseSlice = createSlice({
  name: 'nurse',
  initialState: {
    data: [],
  },
  reducers: {
    getNurseData(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const {getNurseData} = nurseSlice.actions;
export default nurseSlice.reducer;
