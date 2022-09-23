package com.treative.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimulationIteration {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false, precision = 40)
    private BigDecimal infectedPeople;

    @Column(nullable = false, precision = 40)
    private BigDecimal healthPeople;

    @Column(nullable = false, precision = 40)
    private BigDecimal deathPeople;

    @Column(nullable = false, precision = 40)
    private BigDecimal healedPeople;

}
