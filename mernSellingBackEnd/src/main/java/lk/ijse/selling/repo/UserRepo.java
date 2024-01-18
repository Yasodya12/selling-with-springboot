package lk.ijse.selling.repo;

import lk.ijse.selling.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


public interface UserRepo extends JpaRepository<User, String> {
    boolean existsByUsernmae(String name);


    User findTopByOrderByIdDesc();
    User findByUsernmaeAndPassword(String usernmae,String password);
    User findByEmail(String email);
    User findByUsernmae(String username);
}
