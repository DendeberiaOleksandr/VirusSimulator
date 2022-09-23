import React from 'react';
import {useForm} from "react-hook-form";
import {useSaveSimulationMutation} from "./simulationsApiSlice";

function AddSimulationForm() {

    const [saveSimulation] = useSaveSimulationMutation()
    const {register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit(formData) {
        saveSimulation({
            name: formData.name,
            population: formData.population,
            initialInfectedPeople: formData.initialInfected,
            infectionRate: formData.infectionRate,
            deathRate: formData.deathRate,
            daysToRecovery: formData.recoveryDays,
            daysToDie: formData.deathDays,
            daysToSimulate: formData.simulationDays
        }).unwrap()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"gap-3 my-2 flex flex-wrap justify-start items-start"}>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Name</label>
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
                {
                    errors?.name?.message && <label className={"text-red-600"}>{errors.name.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Population</label>
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
                {
                    errors?.population?.message && <label className={"text-red-600"}>{errors.population.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Initial infected</label>
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
                    placeholder={"Initial amount of infected people"}
                    id={"initialInfected"}
                    type={"text"}
                />
                {
                    errors?.initialInfected?.message &&
                    <label className={"text-red-600"}>{errors.initialInfected.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Infection rate</label>
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
                {
                    errors?.infectionRate?.message &&
                    <label className={"text-red-600"}>{errors.infectionRate.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Death rate</label>
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
                {
                    errors?.deathRate?.message && <label className={"text-red-600"}>{errors.deathRate.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Days of recovery</label>
                <input
                    {...register("recoveryDays", {
                        required: {
                            value: true,
                            message: "Days of recovery are required"
                        },
                        pattern: {
                            value: /^[1-9]{1}[0-9]*$/,
                            message: "Days of recovery should be integer value"
                        }
                    })}
                    className={`${errors?.recoveryDays?.message && "border-red-600 text-red-600"} px-4 py-2 border border-blue-200`}
                    placeholder={"Days of recovery"}
                    id={"recoveryDays"}
                    type={"text"}
                />
                {
                    errors?.recoveryDays?.message &&
                    <label className={"text-red-600"}>{errors.recoveryDays.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Days to die</label>
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
                {
                    errors?.deathDays?.message && <label className={"text-red-600"}>{errors.deathDays.message}</label>
                }
            </div>
            <div className={"flex flex-col"}>
                <label className={"py-2 font-bold text-gray-600"}>Days of simulation</label>
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
                {
                    errors?.simulationDays?.message &&
                    <label className={"text-red-600"}>{errors.simulationDays.message}</label>
                }
            </div>
            <input
                value={"Save"}
                className={"w-[215px] px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 transition-colors"}
                type={"submit"}
            />
        </form>
    );
}

export default AddSimulationForm;