package com.treative.api.endpoints.simulations;

import com.treative.api.domain.Simulation;
import com.treative.api.service.SimulationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/simulations")
@RequiredArgsConstructor
public class SimulationController {

    private final SimulationService service;

    @GetMapping
    public List<Simulation> getAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Simulation> getById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.getById(id));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public Simulation save(@RequestBody @Valid SimulationDto dto){
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Simulation> update(@PathVariable Long id, @RequestBody SimulationDto dto){
        try {
            return ResponseEntity.ok(service.update(id, dto));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        try {
            service.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
