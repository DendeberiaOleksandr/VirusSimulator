package com.treative.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Simulation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal population;

    @Column(nullable = false)
    private BigDecimal initialInfectedPeople;

    @Column(nullable = false)
    private Double infectionRate;

    @Column(nullable = false)
    private Double deathRate;

    @Column(nullable = false)
    private Integer daysToRecovery;

    @Column(nullable = false)
    private Integer daysToDie;

    @Column(nullable = false)
    private Integer daysToSimulate;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<SimulationIteration> iterations = new ArrayList<>();

}
