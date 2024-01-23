package lk.ijse.selling.service.Impl;

import lk.ijse.selling.dto.ListingDTO;
import lk.ijse.selling.dto.SearchDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ListingService {

     void saveImg(MultipartFile file) throws IOException;

     void saveListing(ListingDTO listingDTO);


     ListingDTO getListingByID(String id);

     List<ListingDTO> searchListing(SearchDTO searchDTO);

     List<ListingDTO> allLIsting();
}
