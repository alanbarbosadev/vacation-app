package com.dataprev.vacation.models;

import com.dataprev.vacation.dtos.CreateVacationDto;
import com.dataprev.vacation.dtos.VacationDto;
import com.dataprev.vacation.models.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "tb_vacation")
public class Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date createdAt;

    private Date updatedAt;

    private Date startDate;

    private Date endDate;

    private Status status;
    @NotNull
    private Long userId;
    private String userName;

    public Vacation(Long id, Date createdAt, Date updatedAt, Date startDate, Date endDate, Status status, Long userId) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.userId = userId;
    }

    public Vacation(VacationDto vacationDto) {
        this.createdAt = vacationDto.getCreatedAt();
        this.startDate = vacationDto.getStartDate();
        this.endDate = vacationDto.getEndDate();
        this.updatedAt = vacationDto.getUpdatedAt();
        this.status = vacationDto.getStatus();
        this.userId = vacationDto.getUserId();
    }

    public Vacation(CreateVacationDto vacationDto) {
        this.createdAt = new Date();
        this.startDate = vacationDto.getStartDate();
        this.endDate = vacationDto.getEndDate();
        this.status = Status.WAITING;
        this.userId = vacationDto.getUserId();
        this.userName = vacationDto.getUserName();
    }

    public Vacation() { }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
