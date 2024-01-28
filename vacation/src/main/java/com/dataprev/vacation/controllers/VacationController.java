package com.dataprev.vacation.controllers;

import com.dataprev.vacation.dtos.CreateVacationDto;
import com.dataprev.vacation.dtos.UpdateVacationDto;
import com.dataprev.vacation.dtos.VacationDto;
import com.dataprev.vacation.services.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/vacation")
public class VacationController {

    @Autowired
    private VacationService vacationService;

    @GetMapping
    public ResponseEntity<List<VacationDto>> getVacations() {
        var vacationsDto = this.vacationService.getAllVacations();

        return ResponseEntity.ok().body(vacationsDto);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<VacationDto> getVacationById(@PathVariable Long id) {
        var vacationDto = this.vacationService.getVacationById(id);

        return ResponseEntity.ok().body(vacationDto);
    }


    @PostMapping(value = "/add-vacation")
    public ResponseEntity<VacationDto> addVacation(@RequestBody CreateVacationDto vacationDto) {

        var vacation = this.vacationService.addVacation(vacationDto);

        return ResponseEntity.ok().body(vacation);
    }

    @PutMapping(value = "/update-vacation")
    public ResponseEntity<VacationDto> updateVacation(@RequestBody UpdateVacationDto updateVacationDto) throws Exception {
        var vacation = this.vacationService.updateVacation(updateVacationDto);
        return ResponseEntity.ok().body(vacation);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteVacation(@PathVariable Long id) throws Exception {
        this.vacationService.deleteVacation(id);

        return ResponseEntity.noContent().build();
    }
}
