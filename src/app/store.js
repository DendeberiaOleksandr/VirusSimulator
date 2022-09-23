import {configureStore} from '@reduxjs/toolkit';
import {simulationsApi} from "./api/simulationsApi";

export const store = configureStore({
    reducer: {
        [simulationsApi.reducerPath]: simulationsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(simulationsApi.middleware)
});
