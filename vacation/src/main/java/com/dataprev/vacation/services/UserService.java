package com.dataprev.vacation.services;

import com.dataprev.vacation.dtos.*;
import com.dataprev.vacation.models.User;
import com.dataprev.vacation.models.Vacation;
import com.dataprev.vacation.repositories.UserRepository;
import com.dataprev.vacation.services.interfaces.UserServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDto> getAllUsers() {
        var users = userRepository.findAll();
        return users
                .stream()
                .map(x -> mapUserToUserDto(x))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id) {
         Optional<User> userOptional = userRepository.findById(id);
         var user = userOptional.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

         return mapUserToUserDto(user);
    }

    @Override
    public UserDto addUser(CreateUserDto userDto) throws Exception {
        Optional<User> userOptional = userRepository.findById(userDto.getUserId());
        if(userOptional.isPresent()) {
            throw new Exception("Usuário já existente");
        }

        var user = new User(userDto);

        var newUser = userRepository.save(user);
        return mapUserToUserDto(newUser);
    }

    private UserDto mapUserToUserDto(User newUser) {
        var userDto = new UserDto();
        userDto.setUserId(newUser.getUserId());
        userDto.setName(newUser.getName());
        userDto.setIsAdmin(newUser.getIsAdmin());
        userDto.setVacations(newUser.getVacations());

        return userDto;
    }

    @Override
    public UserDto login(LoginDto loginDto) throws Exception {
        Optional<User> userOptional = userRepository.findById(loginDto.getUserId());

        var user = userOptional.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (loginDto.getPassword().equals(user.getPassword())) {
            return mapUserToUserDto(user);
        } else {
            throw new Exception("Senha incorreta");
        }
    }

    @Override
    public UserDto changeUserPermission(ChangeUserPermissionDto userDto) throws Exception {
        try {
            Optional<User> userOptional = userRepository.findById(userDto.getUserId());
            var user = userOptional.orElseThrow(() -> new Exception("Usuário não encontrado"));
            user.setIsAdmin(userDto.getIsAdmin());
            user = userRepository.save(user);
            return mapUserToUserDto(user);

        } catch (EntityNotFoundException e) {
            throw new Exception("Nenhuma pessoa com esse ID foi encontrada.");
        }
    }
}
