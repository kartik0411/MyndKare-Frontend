import { configureStore } from "@reduxjs/toolkit";
import  questionDetail from "./questionSlice";

export const store = configureStore({
    reducer : {
        app:questionDetail
    }
})