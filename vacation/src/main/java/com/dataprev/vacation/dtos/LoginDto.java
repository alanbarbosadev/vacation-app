package com.dataprev.vacation.dtos;

public class LoginDto {
    private Long userId;
    private String password;

    public LoginDto(Long userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public LoginDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
