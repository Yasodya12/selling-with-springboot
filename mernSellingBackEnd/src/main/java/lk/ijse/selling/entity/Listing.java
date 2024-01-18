package lk.ijse.selling.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Listing {
    @Id
    private String id;
    private String name;
    private String description;
    private String address;
    private int regularPricel;
    private int discountPrice;
    private int bathroom;
    private int bedroom;
    private boolean furnished;
    private boolean parking;
    private String type;
    private String offer;
    @ElementCollection
    private List<String> imgUrl;
    private String userRef;


}
