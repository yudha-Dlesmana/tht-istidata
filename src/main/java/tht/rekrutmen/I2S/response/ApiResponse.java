package tht.rekrutmen.I2S.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String status;
    private String message;
    private T data;

    public ApiResponse(int code, String status, String message, T data){
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
