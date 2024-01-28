package com.dataprev.vacation.dtos;

public class ChangeUserPermissionDto {
    private Long userId;
    private boolean isAdmin;

    public ChangeUserPermissionDto(Long userId, boolean isAdmin) {
        this.userId = userId;
        this.isAdmin = isAdmin;
    }

    public ChangeUserPermissionDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean admin) {
        isAdmin = admin;
    }
}
