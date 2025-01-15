import { configureStore } from "@reduxjs/toolkit";
import cats from "./catsSlice"

export const store = configureStore({
    devTools: true,
    reducer: { 
        cats 
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;