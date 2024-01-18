package lk.ijse.selling.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ListingDTO {
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
    private ArrayList<String> imgUrl;
    private String userRef;
}
