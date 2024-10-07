import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import { rickAndMortyApi } from "./api/rickAndMortyApi";
import { perfomanceMiddleware } from "./middleware/perfomanceMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rickAndMortyApi.middleware,
      perfomanceMiddleware,
    ),
});
