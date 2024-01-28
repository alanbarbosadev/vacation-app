package com.dataprev.vacation.dtos;

import com.dataprev.vacation.models.enums.Status;

import java.util.Date;

public class CreateVacationDto {

    private Date startDate;

    private Date endDate;

    private Long userId;

    private String userName;

    public CreateVacationDto() {}

    public CreateVacationDto(Date startDate, Date endDate, Long userId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
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
