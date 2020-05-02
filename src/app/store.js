import { configureStore } from '@reduxjs/toolkit';
import sankeyReducer from '../features/sankey/sankeySlice';

export default configureStore({
  reducer: {
    options: sankeyReducer,
  },
});
