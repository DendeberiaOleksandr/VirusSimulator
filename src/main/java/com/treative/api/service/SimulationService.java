package com.treative.api.service;

import com.treative.api.domain.Simulation;
import com.treative.api.domain.SimulationIteration;
import com.treative.api.endpoints.simulations.SimulationDto;
import com.treative.api.repository.SimulationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SimulationService {

    private final SimulationRepository simulationRepository;


    public List<Simulation> findAll() {
        return simulationRepository.findAll();
    }

    public Simulation save(SimulationDto dto) {

        BigDecimal population = dto.getPopulation();
        BigDecimal initialInfectedPeople = dto.getInitialInfectedPeople();
        Double infectionRate = dto.getInfectionRate();
        Double deathRate = dto.getDeathRate();
        Integer daysToRecovery = dto.getDaysToRecovery();
        Integer daysToDie = dto.getDaysToDie();
        Integer daysToSimulate = dto.getDaysToSimulate();

        return simulationRepository.save(new Simulation(
                null,
                dto.getName(),
                population,
                initialInfectedPeople,
                infectionRate,
                deathRate,
                daysToRecovery,
                daysToDie,
                daysToSimulate,
                generateIterations(population, initialInfectedPeople, infectionRate, deathRate, daysToRecovery, daysToDie, daysToSimulate)
        ));
    }

    private List<SimulationIteration> generateIterations(BigDecimal population,
                                                         BigDecimal initialInfectedPeople,
                                                         Double infectionRate,
                                                         Double deathRate,
                                                         Integer daysToRecovery,
                                                         Integer daysToDie,
                                                         Integer daysToSimulate){
        SimulationIteration initialIteration = new SimulationIteration(
                null,
                new Date(),
                initialInfectedPeople,
                population.subtract(initialInfectedPeople),
                BigDecimal.ZERO,
                BigDecimal.ZERO
        );

        List<SimulationIteration> iterations = new ArrayList<>();
        iterations.add(initialIteration);

        for (int i = 1; i < daysToSimulate; i++){
            SimulationIteration prevIteration = iterations.get(i - 1);

            BigDecimal healthPeople = prevIteration.getHealthPeople();
            BigDecimal infectedPeople = prevIteration.getInfectedPeople();

            if (healthPeople.equals(BigDecimal.ZERO)){

            } else if (infectedPeople.multiply(BigDecimal.valueOf(infectionRate)).compareTo(healthPeople) > 0){
                infectedPeople = healthPeople;
                healthPeople = BigDecimal.ZERO;
            } else {
                infectedPeople = infectedPeople.multiply(BigDecimal.valueOf(infectionRate));
                healthPeople = healthPeople.subtract(infectedPeople);
            }

            BigDecimal healedPeople = BigDecimal.ZERO;
            BigDecimal deathPeople = BigDecimal.ZERO;

            if (i - daysToDie >= 0 && infectedPeople.compareTo(BigDecimal.ZERO) > 0){
                SimulationIteration shouldDieIteration = iterations.get(i - daysToDie);
                deathPeople = shouldDieIteration.getInfectedPeople().multiply(BigDecimal.valueOf(deathRate));
                infectedPeople = infectedPeople.subtract(deathPeople);
            }

            if (i - daysToRecovery >= 0 && infectedPeople.compareTo(BigDecimal.ZERO) > 0){
                SimulationIteration shouldRecoverIteration = iterations.get(i - daysToRecovery);
                healedPeople = shouldRecoverIteration.getInfectedPeople().subtract(shouldRecoverIteration.getInfectedPeople().multiply(BigDecimal.valueOf(deathRate)));
                infectedPeople = infectedPeople.subtract(healedPeople);
            }

            if (infectedPeople.compareTo(BigDecimal.ZERO) < 0){
                infectedPeople = BigDecimal.ZERO;
            }

            iterations.add(new SimulationIteration(
                    null,
                    new Date(prevIteration.getDate().getTime() + 86400000),
                    infectedPeople,
                    healthPeople,
                    deathPeople,
                    healedPeople
            ));

        }

        return iterations;

    }

    public Simulation getById(Long id) {
        return simulationRepository.findById(id).orElseThrow();
    }

    public Simulation update(Long id, SimulationDto dto) {

        Simulation simulation = getById(id);

        simulation.setDaysToSimulate(dto.getDaysToSimulate());
        simulation.setName(dto.getName());
        simulation.setDaysToDie(dto.getDaysToDie());
        simulation.setDeathRate(dto.getDeathRate());
        simulation.setPopulation(dto.getPopulation());
        simulation.setDaysToRecovery(dto.getDaysToRecovery());
        simulation.setInfectionRate(dto.getInfectionRate());
        simulation.setInitialInfectedPeople(dto.getInitialInfectedPeople());
        simulation.setIterations(generateIterations(
                dto.getPopulation(),
                dto.getInitialInfectedPeople(),
                dto.getInfectionRate(),
                dto.getDeathRate(),
                dto.getDaysToRecovery(),
                dto.getDaysToDie(),
                dto.getDaysToSimulate()
        ));

        return simulationRepository.save(simulation);
    }

    public void deleteById(Long id) {
        simulationRepository.deleteById(id);
    }
}
