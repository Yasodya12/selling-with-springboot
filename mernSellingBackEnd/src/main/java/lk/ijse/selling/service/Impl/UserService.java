package lk.ijse.selling.service.Impl;

import lk.ijse.selling.dto.UserDTO;
import lk.ijse.selling.entity.User;
import org.springframework.stereotype.Service;


public interface UserService {
     void addUser(UserDTO userDTO);
     String incrementId(String originalId);

     UserDTO signIn(UserDTO userDTO);

     UserDTO signUpWithGoogle(UserDTO userDTO);

     UserDTO updateUser(UserDTO userDTO);

      void deleteUser(String id);

      UserDTO getUserById(String id);

}
