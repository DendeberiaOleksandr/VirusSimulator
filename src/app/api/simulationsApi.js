import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const simulationsApi = createApi({
    tagTypes: ['Simulation'],
    reducerPath: 'simulationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),
    endpoints: build => ({

    })
})

export default simulationsApi.reducer