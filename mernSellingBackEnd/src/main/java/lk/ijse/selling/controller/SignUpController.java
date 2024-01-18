package lk.ijse.selling.controller;

import lk.ijse.selling.dto.UserDTO;
import lk.ijse.selling.service.Impl.UserService;
import lk.ijse.selling.service.UserServiceImpl;
import lk.ijse.selling.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/signUp")
public class SignUpController {
    @Autowired
    UserService userServiceImpl;



    @PostMapping
    private ResponseUtil signUp(@RequestBody UserDTO userDTO){
        System.out.println("awa controller");
        userServiceImpl.addUser(userDTO);

        return new ResponseUtil(true,"Ok","Successfully Added",userDTO);
    }
    @PutMapping
    private ResponseUtil updateUser(@RequestBody UserDTO userDTO){


        userServiceImpl.updateUser(userDTO);
        return new ResponseUtil(true,"Ok","Successfully Updated",userDTO);
    }


    @DeleteMapping(params = {"id"})
    private ResponseUtil deleteUSer(String id){
        userServiceImpl.deleteUser(id);
        return new ResponseUtil(true,"Ok","Successfully Deleted",id);
    }

}
