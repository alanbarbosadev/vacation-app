package com.dataprev.vacation.dtos;

public class CreateUserDto {
    private Long userId;
    private String name;
    private String password;
    private boolean isAdmin;

    public CreateUserDto(Long userId, String name, boolean isAdmin, String password) {
        this.userId = userId;
        this.name = name;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    public CreateUserDto() {
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
