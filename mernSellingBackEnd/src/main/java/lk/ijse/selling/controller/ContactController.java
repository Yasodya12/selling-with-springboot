package lk.ijse.selling.controller;

import lk.ijse.selling.dto.UserDTO;
import lk.ijse.selling.service.Impl.UserService;
import lk.ijse.selling.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin
public class ContactController {
    @Autowired
    UserService userService;
    @GetMapping
    private ResponseUtil getUserByID(@RequestParam("id")String id){
        UserDTO user = userService.getUserById(id);
        return new ResponseUtil(true,"Ok","your User",user);
    }
}
