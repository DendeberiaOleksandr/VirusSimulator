import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetSimulationByIdQuery, useUpdateSimulationMutation} from "./simulationsApiSlice";
import {useForm} from "react-hook-form";
import {AiFillHome} from "react-icons/ai";
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

function SimulationDetails() {

    const [updateSimulation] = useUpdateSimulationMutation()
    const [chosenIteration, setChosenIteration] = useState()
    const navigate = useNavigate()
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const {id} = useParams()
    const {data: simulation, isLoading} = useGetSimulationByIdQuery(id)

    useEffect(() => {
        setValue("id", simulation?.id)
        setValue("name", simulation?.name)
        setValue("population", simulation?.population)
        setValue("initialInfected", simulation?.initialInfectedPeople)
        setValue("infectionRate", simulation?.infectionRate)
        setValue("deathRate", simulation?.deathRate)
        setValue("recoveryDays", simulation?.daysToRecovery)
        setValue("deathDays", simulation?.daysToDie)
        setValue("simulationDays", simulation?.daysToSimulate)
    }, [simulation])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    function onSubmit(formData) {
        updateSimulation({
            id: formData.id,
            body: {
                name: formData.name,
                population: formData.population,
                initialInfectedPeople: formData.initialInfected,
                infectionRate: formData.infectionRate,
                deathRate: formData.deathRate,
                daysToRecovery: formData.recoveryDays,
                daysToDie: formData.deathDays,
                daysToSimulate: formData.simulationDays
            }
        }).unwrap()
            .then(() => setChosenIteration())
            .catch(() => setChosenIteration())
    }

    const infectedChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
    };

    function generateChartData({label, attribute}){
        return {
            labels: simulation.iterations.map(iteration => iteration.date.split('T')[0]),
            datasets: [
                {
                    fill: true,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    label,
                    data: simulation.iterations.map(iteration => iteration[attribute])
                }
            ]
        }
    }

    return (
        <div>
            <h1 className={"text-white bg-blue-400 px-4 py-2"}>Simulation details: {simulation.name}</h1>
            <AiFillHome onClick={() => navigate("/")}
                        className={"my-2 text-3xl cursor-pointer hover:text-blue-500 transition-colors text-blue-400"}/>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-center items-start"}>
                <input
                    hidden
                    {...register("id", {
                        required: {
                            value: true,
                            message: "Id is required"
                        }
                    })}
                />
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Name</label>
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            }
                        })}
                        className={`${errors?.name?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Name"}
                        id={"name"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.name?.message && <label className={"mb-2 text-red-600"}>{errors.name.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Population</label>
                    <input
                        {...register("population", {
                            required: {
                                value: true,
                                message: "Population is required"
                            },
                            pattern: {
                                value: /^[1-9]{1}[0-9]*$/,
                                message: "Population should be integer value"
                            }
                        })}
                        className={`${errors?.population?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Population"}
                        id={"population"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.population?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.population.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Initial infected</label>
                    <input
                        {...register("initialInfected", {
                            required: {
                                value: true,
                                message: "Initial infected people amount is required"
                            },
                            pattern: {
                                value: /^[1-9]{1}[0-9]*$/,
                                message: "Initial infected people should be integer value"
                            }
                        })}
                        className={`${errors?.initialInfected?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Initial infected"}
                        id={"initialInfected"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.initialInfected?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.initialInfected.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Infection Rate</label>
                    <input
                        {...register("infectionRate", {
                            required: {
                                value: true,
                                message: "Infection rate is required"
                            },
                            pattern: {
                                value: /^\d*\.?\d+$/,
                                message: "Infection rate should be numeric value"
                            }
                        })}
                        className={`${errors?.infectionRate?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Infection rate"}
                        id={"infectionRate"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.infectionRate?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.infectionRate.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Death Rate</label>
                    <input
                        {...register("deathRate", {
                            required: {
                                value: true,
                                message: "Death rate is required"
                            },
                            pattern: {
                                value: /^\d*\.?\d+$/,
                                message: "Death rate should be numeric value"
                            }
                        })}
                        className={`${errors?.deathRate?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Death rate"}
                        id={"deathRate"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.deathRate?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.deathRate.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Days to recovery</label>
                    <input
                        {...register("recoveryDays", {
                            required: {
                                value: true,
                                message: "Days to recovery are required"
                            },
                            pattern: {
                                value: /^[1-9]{1}[0-9]*$/,
                                message: "Days to recovery should be integer value"
                            }
                        })}
                        className={`${errors?.recoveryDays?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Death rate"}
                        id={"recoveryDays"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.recoveryDays?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.recoveryDays.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Days to die</label>
                    <input
                        {...register("deathDays", {
                            required: {
                                value: true,
                                message: "Days to die are required"
                            },
                            pattern: {
                                value: /^[1-9]{1}[0-9]*$/,
                                message: "Days to die should be integer value"
                            }
                        })}
                        className={`${errors?.deathDays?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Days to die"}
                        id={"deathDays"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.deathDays?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.deathDays.message}</label>
                }
                <div className={"w-[400px] justify-between items-center flex my-2 gap-4"}>
                    <label>Days of simulation</label>
                    <input
                        {...register("simulationDays", {
                            required: {
                                value: true,
                                message: "Days of simulation are required"
                            },
                            pattern: {
                                value: /^[1-9]{1}[0-9]*$/,
                                message: "Days of simulation should be integer value"
                            }
                        })}
                        className={`${errors?.simulationDays?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                        placeholder={"Days of simulation"}
                        id={"simulationDays"}
                        type={"text"}
                    />
                </div>
                {
                    errors?.simulationDays?.message &&
                    <label className={"mb-2 text-red-600"}>{errors.simulationDays.message}</label>
                }
                <input
                    value={"Update"}
                    className={"cursor-pointer hover:bg-blue-500 transition-colors px-4 py-2 bg-blue-400 text-white"}
                    type={"submit"}
                />
            </form>

            <div className={"my-2 bg-gray-50 rounded shadow-md"}>
                <div className={"px-4 py-2 text-gray-600"}>
                    <span>Died people: {
                        simulation.iterations.reduce((sum, iteration) => {
                            return sum + iteration.deathPeople
                        }, 0)
                    }</span>
                </div>
            </div>

            <div className={"my-2"}>
                <Line
                    options={infectedChartOptions}
                    data={generateChartData({
                        label: "Infected people",
                        attribute: "infectedPeople"
                    })}
                />
            </div>

            <div className={"my-2"}>
                <Line
                    options={infectedChartOptions}
                    data={generateChartData({
                        label: "Died people",
                        attribute: "deathPeople"
                    })}
                />
            </div>

            <div className={"my-2"}>
                <Line
                    options={infectedChartOptions}
                    data={generateChartData({
                        label: "Healed people",
                        attribute: "healedPeople"
                    })}
                />
            </div>

            <div className={"flex flex-col"}>
                <h1 className={"text-center text-lg text-blue-400"}>Separate days statistic</h1>
                <div className={"my-4 flex flex-wrap gap-4"}>
                    {
                        simulation.iterations.map(iteration => (
                            <div onClick={() => setChosenIteration(iteration)} className={`${chosenIteration?.id === iteration.id && "bg-blue-400 text-white"} cursor-pointer hover:border-blue-400 px-4 py-2 border`} key={iteration.id}>
                                {iteration.date.split('T')[0]}
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                chosenIteration && <div className={"my-4 flex flex-col gap-2 px-4 py-2 bg-blue-400 text-white shadow-md"}>
                    <label>Infected people: {chosenIteration.infectedPeople}</label>
                    <label>Health people: {chosenIteration.healthPeople}</label>
                    <label>Died people: {chosenIteration.deathPeople}</label>
                    <label>Healed people: {chosenIteration.healedPeople}</label>
                </div>
            }

        </div>
    );
}

export default SimulationDetails;