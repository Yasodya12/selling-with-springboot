package lk.ijse.selling.service;

import lk.ijse.selling.dto.ListingDTO;

import lk.ijse.selling.dto.SearchDTO;
import lk.ijse.selling.entity.Listing;
import lk.ijse.selling.entity.User;
import lk.ijse.selling.repo.ListingRepo;
import lk.ijse.selling.service.Impl.ListingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;


@Service
public class ListingServiceImpl implements ListingService {
    @Autowired
    ModelMapper mapper;

    @Autowired
    ListingRepo listingRepo;


    public void saveImg(MultipartFile file)  {
        try {
            file.transferTo(new File("D:\\IJSE\\mern-spring-boot\\client\\src\\imges\\"+file.getOriginalFilename()));
            System.out.println("catch na"+file);

//            D:\IJSE\mern-spring-boot\client\src\imges
        } catch (IOException e) {
            System.out.println("exeption catch kara");

        }
    }

    @Override
    public void saveListing(ListingDTO listingDTO) {
        listingDTO.setId(incrementId(listingRepo.findTopByOrderByIdDesc().getId()));

        Listing map = mapper.map(listingDTO, Listing.class);
        System.out.println(map);
       listingRepo.save(map);
    }

    @Override
    public ListingDTO getListingByID(String id) {
        Listing listing = listingRepo.findById(id).get();
      return mapper.map(listing,ListingDTO.class);
    }

    @Override
    public List<ListingDTO> searchListing(SearchDTO searchDTO) {



        List<Listing> listings = listingRepo.searchCustomerWithName(searchDTO.isOffer(),searchDTO.isFurnished(),searchDTO.isParking(),searchDTO.getType());
        return mapper.map(listings, new TypeToken<List<ListingDTO>>() {
        }.getType());
    }

    @Override
    public List<ListingDTO> allLIsting() {
        List<Listing> all = listingRepo.findAll();
        return mapper.map(all, new TypeToken<List<ListingDTO>>() {
        }.getType());
    }

    public String incrementId(String originalId) {

        String numericPart = originalId.substring(1);


        int incrementedValue = Integer.parseInt(numericPart) + 1;


        String incrementedId = String.format("L%03d", incrementedValue);

        return incrementedId;
    }

}
