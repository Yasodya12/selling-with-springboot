package lk.ijse.selling.controller;

import lk.ijse.selling.dto.UserDTO;
import lk.ijse.selling.service.Impl.UserService;
import lk.ijse.selling.service.UserServiceImpl;
import lk.ijse.selling.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/signIn")
public class SignInController {
    @Autowired
    UserService userService;


    @PostMapping
    private ResponseUtil signIn(@RequestBody UserDTO userDTO){
        System.out.println(userDTO+"awa controller sing In");
        UserDTO b = userService.signIn(userDTO);

        System.out.println(b);
        return new ResponseUtil(true,"Ok","Successfully Added",b);
    }
    @PutMapping
    private ResponseUtil signUpGoogle(@RequestBody UserDTO userDTO){
        System.out.println("awa controller");
        userService.signUpWithGoogle(userDTO);

        return new ResponseUtil(true,"Ok","Successfully Added",userDTO);
    }
}
