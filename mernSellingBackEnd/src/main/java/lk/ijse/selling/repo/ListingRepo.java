package lk.ijse.selling.repo;

import lk.ijse.selling.entity.Listing;
import lk.ijse.selling.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingRepo extends JpaRepository<Listing, String> {
    Listing findTopByOrderByIdDesc();

//    @Query(value = "select * from Listing where  offer=:offer and furnished=:furnished and parking=:parking and type=:type LIMIT :limit",nativeQuery = true)
//    List<Listing> searchCustomerWithName(@Param("offer") boolean offer,@Param("furnished") boolean furnished,@Param("parking") boolean parking
//    ,@Param("type")String type,@Param("limit")int limit);


//    @Query(value = "SELECT * FROM Listing WHERE (offer = :offer OR (:offer = 'false' AND offer IN ('true', 'false')))" + " AND (furnished IN (:furnished, TRUE, FALSE) OR (:furnished IS NULL AND furnished IN (TRUE, FALSE)))" + " AND (:parking IS NULL OR parking = " + "CASE WHEN :parking = 'false' THEN false WHEN :parking = 'true' THEN true ELSE parking END) AND" + " (type IN (:type, 'sale', 'rent') OR (:type IS NULL AND type IN ('sale', 'rent'))) LIMIT 9; ",nativeQuery = true)
//    List<Listing> searchCustomerWithName(@Param("offer") boolean offer,@Param("furnished") boolean furnished,@Param("parking") boolean parking
//            ,@Param("type")String type);

    @Query(value = "SELECT * FROM Listing WHERE (:offer = 'false' OR offer = :offer) AND (:furnished = 'false' OR furnished = :furnished)    AND (:parking = 'false' OR parking = :parking)  AND (:type = 'all' OR type = :type)  LIMIT 9;",nativeQuery = true)
    List<Listing> searchCustomerWithName(@Param("offer") boolean offer,@Param("furnished") boolean furnished,@Param("parking")boolean parking,@Param("type") String type);

//    SELECT * FROM Listing WHERE (:offer = 'false' OR offer = :offer) AND (:furnished = 'false' OR furnished = :furnished)    AND (:parking = 'false' OR parking = :parking) LIMIT 9;
}
