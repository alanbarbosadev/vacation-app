package com.dataprev.vacation.models;

import com.dataprev.vacation.dtos.CreateUserDto;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_user")
public class User {

    @Id
    private Long userId;
    private String name;
    private String password;
    private boolean isAdmin;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private List<Vacation> vacations = new ArrayList<>();

    public User(Long userId, String name, String password, boolean isAdmin) {
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public User(CreateUserDto userDto) {
        this.userId = userDto.getUserId();
        this.name = userDto.getName();
        this.password = userDto.getPassword();
        this.isAdmin = userDto.getIsAdmin();
    }

    public User() { }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
