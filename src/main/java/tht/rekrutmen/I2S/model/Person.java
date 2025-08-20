package tht.rekrutmen.I2S.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    private Long nik;
    private String name;
    private LocalDate birthDate;
    private String gender;
    private String address;
    private String country;
}
