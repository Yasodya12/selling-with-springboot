package lk.ijse.selling.dto;

import lombok.*;



public class SearchDTO {
    public SearchDTO() {
    }

    public SearchDTO(boolean offer, boolean furnished, boolean parking, String type, int limit) {
        this.offer = offer;
        this.furnished = furnished;
        this.parking = parking;
        this.type = type;
        this.limit = limit;
    }

    boolean offer;
    boolean furnished;
    boolean parking;
    String type;
    int limit;

    public boolean isOffer() {
        return offer;
    }

    public void setOffer(boolean offer) {
        this.offer = offer;
    }

    public boolean isFurnished() {
        return furnished;
    }

    public void setFurnished(boolean furnished) {
        this.furnished = furnished;
    }

    public boolean isParking() {
        return parking;
    }

    public void setParking(boolean parking) {
        this.parking = parking;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    @Override
    public String toString() {
        return "SearchDTO{" +
                "offer=" + offer +
                ", furnished=" + furnished +
                ", parking=" + parking +
                ", type='" + type + '\'' +
                ", limit=" + limit +
                '}';
    }


}
