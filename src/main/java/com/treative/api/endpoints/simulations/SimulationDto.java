package com.treative.api.endpoints.simulations;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimulationDto {

    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    private BigDecimal population;

    @NotNull
    private BigDecimal initialInfectedPeople;

    @NotNull
    private Double infectionRate;

    @NotNull
    private Double deathRate;

    @NotNull
    private Integer daysToRecovery;

    @NotNull
    private Integer daysToDie;

    @NotNull
    private Integer daysToSimulate;

}
