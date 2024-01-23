package lk.ijse.selling.service;

import lk.ijse.selling.dto.UserDTO;
import lk.ijse.selling.entity.User;
import lk.ijse.selling.repo.UserRepo;
import lk.ijse.selling.service.Impl.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;
    public void addUser(UserDTO userDTO){
        System.out.println("awa "+userDTO);



        userDTO.setId(incrementId(userRepo.findTopByOrderByIdDesc().getId()));

        System.out.println(userDTO);


        if (userRepo.existsByUsernmae(userDTO.getUsernmae())){
            throw new RuntimeException(userDTO.getUsernmae()+"Username is already exits, please insert a new username");
        }

        User map = mapper.map(userDTO, User.class);

        System.out.println(map);
        userRepo.save(map);
    }


     public String incrementId(String originalId) {

        String numericPart = originalId.substring(1);


        int incrementedValue = Integer.parseInt(numericPart) + 1;


        String incrementedId = String.format("U%03d", incrementedValue);

        return incrementedId;
    }

    @Override
    public UserDTO signIn(UserDTO userDTO) {
        User user = userRepo.findByUsernmaeAndPassword(userDTO.getUsernmae(), userDTO.getPassword());
        UserDTO userRst = mapper.map(user, UserDTO.class);
        System.out.println("result USer"+userRst);
        return userRst;
    }

    @Override
    public UserDTO signUpWithGoogle(UserDTO userDTO) {
        User user = userRepo.findByEmail(userDTO.getEmail());

        StringBuilder concatenatedStringBuilder = new StringBuilder();
        String[] split = userDTO.getUsernmae().toLowerCase().split("\\s+");

        for (String word : split) {
            concatenatedStringBuilder.append(word);
        }

        String password= UUID.randomUUID().toString().replaceAll("-", "").substring(0, 5)+UUID.randomUUID().toString().replaceAll("-", "").substring(0, 5);


        if (user==null){
            User save = userRepo.save(new User(incrementId(userRepo.findTopByOrderByIdDesc().getId()),
                    concatenatedStringBuilder.toString() + password, userDTO.getEmail(), password, null, null));
            return mapper.map(save, UserDTO.class);

        }else{
            UserDTO userRst = mapper.map(user, UserDTO.class);
            return userRst;
        }


    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {

        if (userRepo.existsByUsernmae(userDTO.getUsernmae())){
            throw new RuntimeException(userDTO.getUsernmae()+" is already exits, please insert a new username");
        }


        User updateUser = userRepo.findById(userDTO.getId()).get();
        updateUser.setUsernmae(userDTO.getUsernmae());
        updateUser.setEmail(userDTO.getEmail());
        updateUser.setPassword(userDTO.getPassword());

        User save = userRepo.save(updateUser);
        return mapper.map(save, UserDTO.class);

    }
    @Override
    public void deleteUser(String id){

        if (!userRepo.existsById(id)) {
            throw new RuntimeException(id+ " User is not available!");
        }
        userRepo.deleteById(id);
    }

    @Override
    public UserDTO getUserById(String id) {
        User user = userRepo.findById(id).get();
       return mapper.map(user, UserDTO.class);
    }

}
