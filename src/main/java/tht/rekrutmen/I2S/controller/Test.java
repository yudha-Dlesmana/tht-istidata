package tht.rekrutmen.I2S.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tht.rekrutmen.I2S.response.ApiResponse;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Test {
    @GetMapping("/api/test")
    public ResponseEntity<ApiResponse<Map<String, String>>> hello(){
        Map<String, String> data  = new HashMap<>();
        data.put("Test", "Hello, this is a test API from spring boot");
        ApiResponse<Map<String, String>> response = new ApiResponse<>(
                200,
                "OK",
                "successful",
                data
        );

        return ResponseEntity.ok(response);
    }
}
