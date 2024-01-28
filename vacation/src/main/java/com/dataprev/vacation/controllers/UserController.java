package com.dataprev.vacation.controllers;

import com.dataprev.vacation.dtos.*;
import com.dataprev.vacation.models.User;
import com.dataprev.vacation.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        var users = this.userService.getAllUsers();

        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        var userDto = this.userService.getUserById(id);

        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping(value = "/add-user")
    public ResponseEntity<UserDto> addVacation(@RequestBody CreateUserDto userDto) throws Exception {
        var newUser = this.userService.addUser(userDto);
        return ResponseEntity.ok().body(newUser);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginDto loginDto) throws Exception {
        var userDto = this.userService.login(loginDto);

        return ResponseEntity.ok().body(userDto);
    }

    @PutMapping(value = "/change-permission")
    public ResponseEntity<UserDto> changePermission(@RequestBody ChangeUserPermissionDto userDto) throws Exception {
        var user = userService.changeUserPermission(userDto);
        return ResponseEntity.ok().body(user);
    }

}
