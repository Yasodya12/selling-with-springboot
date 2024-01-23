package lk.ijse.selling.controller;

import lk.ijse.selling.dto.ListingDTO;
import lk.ijse.selling.dto.SearchDTO;
import lk.ijse.selling.service.Impl.ListingService;
import lk.ijse.selling.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/listing")
@CrossOrigin
public class ListingController {

    @Autowired
    ListingService listingService;

    @PostMapping(path = {"/imgSaave"})
    public ResponseUtil saveImg( @RequestParam("img") MultipartFile img) throws IOException {
        System.out.println("awa img");
        listingService.saveImg(img);
        return new ResponseUtil(true,"Ok","Successfully Added",null);

    }

    @PostMapping
    public ResponseUtil saveListing(@RequestBody ListingDTO listingDTO){
        System.out.println("save listing"+listingDTO.getImgUrl());
        listingService.saveListing(listingDTO);
        return new ResponseUtil(true,"Ok","Successfully Added",listingDTO);
    }

    @GetMapping
    private ResponseUtil getById(@RequestParam("id")String id){
        ListingDTO listingByID = listingService.getListingByID(id);
        return new ResponseUtil(true,"Ok","Listing is there", listingByID);
    }

    @GetMapping(path = "/getAll")
    private ResponseUtil getAll(){
        List<ListingDTO> listingDTOS = listingService.allLIsting();
        return new ResponseUtil(true,"Ok","Listing is there", listingDTOS);
    }

    @GetMapping(path = {"/search"})
    public ResponseUtil search(@RequestParam("type") String type, @RequestParam("parking") boolean parking,@RequestParam("furnished") boolean furnished,@RequestParam("offer")boolean offer){

        System.out.println("conroller eka "+type +parking+furnished+offer);
        SearchDTO searchDTO = new SearchDTO();
        searchDTO.setFurnished(furnished);
        searchDTO.setType(type);
        searchDTO.setParking(parking);
        searchDTO.setOffer(offer);
        searchDTO.setLimit(9);
        System.out.println(searchDTO);
        List<ListingDTO> listingDTOS = listingService.searchListing(searchDTO);
        return new ResponseUtil(true,"ok","result",listingDTOS);

    }

}
