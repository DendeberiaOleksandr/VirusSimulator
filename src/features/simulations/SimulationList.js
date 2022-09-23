import React from 'react';
import {useDeleteSimulationByIdMutation, useGetSimulationsQuery} from "./simulationsApiSlice";
import {RiDeleteBinLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";

function SimulationList() {

    const {data: simulations, isLoading} = useGetSimulationsQuery()
    const [deleteSimulationById] = useDeleteSimulationByIdMutation()

    const navigate = useNavigate()

    if (isLoading){
        return <p>Loading...</p>
    }

    return (
        <table className={"text-center border-collapse"}>
            <thead>
                <tr className={"bg-blue-400 text-white border-b border-blue-200"}>
                    <th className={"px-4 py-2"}>Name</th>
                    <th className={"px-4 py-2"}>Population</th>
                    <th className={"px-4 py-2"}>Initial infected</th>
                    <th className={"px-4 py-2"}>Infection rate</th>
                    <th className={"px-4 py-2"}>Death rate</th>
                    <th className={"px-4 py-2"}>Days to recovery</th>
                    <th className={"px-4 py-2"}>Days to death</th>
                    <th className={"px-4 py-2"}>Days of simulation</th>
                    <th className={"px-4 py-2"}>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                simulations.map(simulation => <tr className={"hover:bg-gray-100 transition-colors cursor-pointer border-b border-blue-200"} key={simulation.id}>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.name}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.population}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.initialInfectedPeople}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.infectionRate}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.deathRate}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.daysToRecovery}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.daysToDie}</td>
                    <td onClick={() => navigate(`/simulations/${simulation.id}`)} className={"px-4 py-2"}>{simulation.daysToSimulate}</td>
                    <td className={"px-4 py-2"}>
                        <div
                            onClick={() => {
                                deleteSimulationById(simulation.id)
                                    .unwrap()
                            }}
                            className={"w-[40px] h-[40px] transition-colors hover:shadow-md flex items-center justify-center rounded-[50%] hover:bg-blue-400 hover:text-white"}>
                            <RiDeleteBinLine className={"text-lg"}/>
                        </div>
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    );
}

export default SimulationList;