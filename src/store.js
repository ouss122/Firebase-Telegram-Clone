import { configureStore } from "@reduxjs/toolkit";
import TeleR from "./features/TelegramSlice";

export const store=configureStore({
    reducer:{
        TeleR,
    }
})