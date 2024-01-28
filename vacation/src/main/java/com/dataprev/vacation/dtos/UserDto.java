package com.dataprev.vacation.dtos;

import com.dataprev.vacation.models.Vacation;

import java.util.ArrayList;
import java.util.List;

public class UserDto {
    private Long userId;
    private String name;
    private boolean isAdmin;
    private List<Vacation> vacations = new ArrayList<>();

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean admin) {
        isAdmin = admin;
    }

    public List<Vacation> getVacations() {
        return vacations;
    }

    public void setVacations(List<Vacation> vacations) {
        this.vacations = vacations;
    }
}
