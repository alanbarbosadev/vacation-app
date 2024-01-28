package com.dataprev.vacation.services;

import com.dataprev.vacation.dtos.CreateVacationDto;
import com.dataprev.vacation.dtos.UpdateVacationDto;
import com.dataprev.vacation.dtos.VacationDto;
import com.dataprev.vacation.models.Vacation;
import com.dataprev.vacation.repositories.VacationRepository;
import com.dataprev.vacation.services.interfaces.VacationServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VacationService implements VacationServiceInterface {

    @Autowired
    private VacationRepository vacationRepository;

    @Override
    public List<VacationDto> getAllVacations() {
        var vacations = vacationRepository.findAll();
        return vacations
                .stream()
                .map(this::mapVacationToVacationDto)
                .collect(Collectors.toList());
    }

    @Override
    public VacationDto getVacationById(Long id) {
        Optional<Vacation> vacationOptional = vacationRepository.findById(id);
        var vacation = vacationOptional.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return mapVacationToVacationDto(vacation);
    }

    @Override
    public VacationDto addVacation(CreateVacationDto vacationDto) {
        var vacation = new Vacation(vacationDto);
        vacation = vacationRepository.save(vacation);
        return mapVacationToVacationDto(vacation);
    }

    @Override
    public VacationDto updateVacation(UpdateVacationDto updateVacationDto) throws Exception {
        try {
            Vacation vacation = vacationRepository.getReferenceById(updateVacationDto.getId());
            vacation.setStatus(updateVacationDto.getStatus());
            vacation.setStartDate(updateVacationDto.getStartDate());
            vacation.setEndDate(updateVacationDto.getEndDate());
            vacation.setUpdatedAt(new Date());
            vacation = vacationRepository.save(vacation);
            return mapVacationToVacationDto(vacation);

        } catch (EntityNotFoundException e) {
            throw new Exception("Nenhuma pessoa com esse ID foi encontrada.");
        }
    }

    private VacationDto mapVacationToVacationDto(Vacation vacation) {
        var vacationDto = new VacationDto();

        vacationDto.setId(vacation.getId());
        vacationDto.setCreatedAt(vacation.getCreatedAt());
        vacationDto.setStartDate(vacation.getStartDate());
        vacationDto.setEndDate(vacation.getEndDate());
        vacationDto.setUpdatedAt(vacation.getUpdatedAt());
        vacationDto.setStatus(vacation.getStatus());
        vacationDto.setUserName(vacation.getUserName());
        vacationDto.setUserId(vacation.getUserId());

        return vacationDto;
    }

    @Override
    public void deleteVacation(Long id) throws Exception{
        try {
            vacationRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new Exception("Nenhuma vacation com esse ID foi encontrada.");
        }
    }
}
