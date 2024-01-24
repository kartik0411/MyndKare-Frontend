import { configureStore } from "@reduxjs/toolkit";
import  schoolSlice  from "./schoolSlice";
import questionSlice from "./questionSlice";
import schoolResultSlice from "./schoolResultSlice";
import classSlice from "./classSlice";
import sectionSlice from "./sectionSlice";
import examSlice from "./examSlice";
import studentSlice from "./studentSlice";
import studentTestSlice from "./studentTestSlice";
import testSlice from "./testSlice";
import dbdaSlice from "./dbdaSlice";
import mbtiSlice from "./mbtiSlice";
import dbdaScoreSlice from "./dbdaScoreSlice";
import cisInterestSlice from "./cisInterestSlice";
import cisStenSlice from "./cisStenSlice";

export const store = configureStore({
    reducer : {
        questionDetail : questionSlice,
        schoolDetail : schoolSlice,
        schoolResultDetail : schoolResultSlice,
        classDetail : classSlice,
        sectionDetail : sectionSlice,
        examDetail : examSlice,
        testDetail : testSlice,
        dbdaDetail : dbdaSlice,
        mbtiDetail : mbtiSlice,
        dbdaScoreDetail : dbdaScoreSlice,
        cisInterestDetail: cisInterestSlice,
        cisStenDetail : cisStenSlice,
        studentDetail : studentSlice,
        studentTestDetail: studentTestSlice
    }
})