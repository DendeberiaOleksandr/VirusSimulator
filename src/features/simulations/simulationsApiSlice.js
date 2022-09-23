import {simulationsApi} from "../../app/api/simulationsApi";

const simulationsApiSlice = simulationsApi.injectEndpoints({
    endpoints: builder => ({
        getSimulations: builder.query({
            query: () => ({
                url: "/simulations",
                method: 'GET'
            }),
            providesTags: ['Simulation']
        }),
        getSimulationById: builder.query({
            query: (id) => ({
                url: `/simulations/${id}`,
                method: 'GET'
            }),
            providesTags: ['Simulation']
        }),
        saveSimulation: builder.mutation({
            query: (body) => ({
                url: '/simulations',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Simulation']
        }),
        deleteSimulationById: builder.mutation({
            query: (id) => ({
                url: `/simulations/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Simulation']
        }),
        updateSimulation: builder.mutation({
            query: ({id, body}) => ({
                url: `/simulations/${id}`,
                body,
                method: 'PUT'
            }),
            invalidatesTags: ['Simulation']
        })
    })
})

export const {
    useGetSimulationsQuery,
    useGetSimulationByIdQuery,
    useSaveSimulationMutation,
    useDeleteSimulationByIdMutation,
    useUpdateSimulationMutation,
} = simulationsApiSlice