package com.dataprev.vacation.services.interfaces;

import com.dataprev.vacation.dtos.ChangeUserPermissionDto;
import com.dataprev.vacation.dtos.CreateUserDto;
import com.dataprev.vacation.dtos.LoginDto;
import com.dataprev.vacation.dtos.UserDto;
import com.dataprev.vacation.models.User;

import java.util.List;

public interface UserServiceInterface {

    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto addUser(CreateUserDto userDto) throws Exception;
    UserDto login(LoginDto loginDto) throws Exception;
    UserDto changeUserPermission(ChangeUserPermissionDto userDto) throws Exception;
}
