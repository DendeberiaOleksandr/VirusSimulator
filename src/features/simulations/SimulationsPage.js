import React from 'react';
import AddSimulationForm from "./AddSimulationForm";
import SimulationList from "./SimulationList";

function SimulationsPage() {
    return (
        <div>
            <AddSimulationForm/>
            <SimulationList/>
        </div>
    );
}

export default SimulationsPage;