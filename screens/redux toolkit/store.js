const {configureStore} = require('@reduxjs/toolkit');
import nurseReducer from './nurseSlice';
export const store = configureStore({
  reducer: {
    nurse: nurseReducer,
  },
});
