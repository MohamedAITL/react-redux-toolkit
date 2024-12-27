import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherApiSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    }
});