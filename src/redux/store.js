import { configureStore } from "@reduxjs/toolkit";
import  schoolSlice  from "./schoolSlice";
import questionSlice from "./questionSlice";
import schoolResultSlice from "./schoolResultSlice";
import classSlice from "./classSlice";
import sectionSlice from "./sectionSlice";
import examSlice from "./examSlice";
import testSlice from "./testSlice";

export const store = configureStore({
    reducer : {
        questionDetail : questionSlice,
        schoolDetail : schoolSlice,
        schoolResultDetail : schoolResultSlice,
        classDetail : classSlice,
        sectionDetail : sectionSlice,
        examDetail : examSlice,
        testDetail : testSlice
    }
})