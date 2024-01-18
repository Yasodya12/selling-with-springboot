package lk.ijse.selling.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseUtil {
    private boolean success;
    private String state;
    private String message;
    private Object data;
}
