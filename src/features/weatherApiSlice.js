import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_ID;
// const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${API_KEY}`;

const initialState = [];

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const res = await axios.get(WEATHER_URL);
    return res.data;
});

const weatherApiSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            return [action.payload];
        });
    }
});

export default weatherApiSlice.reducer;