package com.dataprev.vacation.services.interfaces;

import com.dataprev.vacation.dtos.CreateVacationDto;
import com.dataprev.vacation.dtos.UpdateVacationDto;
import com.dataprev.vacation.dtos.VacationDto;

import java.util.List;

public interface VacationServiceInterface {
    List<VacationDto> getAllVacations();
    VacationDto getVacationById(Long id);
    VacationDto addVacation(CreateVacationDto vacationDto);
    VacationDto updateVacation(UpdateVacationDto updateVacationDto) throws Exception;

    void deleteVacation(Long id) throws Exception;
}
