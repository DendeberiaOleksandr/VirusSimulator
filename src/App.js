import React from 'react';
import {Route, Routes} from "react-router-dom";
import SimulationsPage from "./features/simulations/SimulationsPage";
import SimulationDetails from "./features/simulations/SimulationDetails";

function App() {
    return (
        <div className={"w-[1024px] mx-auto mt-4"}>
            <Routes>
                <Route index element={<SimulationsPage/>} />
                <Route path={'/simulations/:id'} element={<SimulationDetails/>} />
            </Routes>
        </div>
    );
}

export default App;
