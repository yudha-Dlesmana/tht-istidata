package tht.rekrutmen.I2S.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tht.rekrutmen.I2S.model.Person;
import tht.rekrutmen.I2S.response.ApiResponse;
import tht.rekrutmen.I2S.service.PersonService;

import java.util.List;
import java.util.Optional;

@RestController
public class PersonController {
    private final PersonService personService;

    public PersonController(PersonService personService){
        this.personService = personService;
    }

    @GetMapping("/api/person")
    public ResponseEntity<ApiResponse<List<Person>>> findAllPerson(){

        List<Person> data = personService.getAllPerson();

        ApiResponse<List<Person>> response = new ApiResponse<>(
                200,
                "OK",
                "Record fetched successfully",
                data
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/person/{nik}")
    public ResponseEntity<ApiResponse<Optional<Person>>> findById(@PathVariable Long nik){
        Optional<Person> data = personService.findById(nik);

        ApiResponse<Optional<Person>> response = new ApiResponse<>(
                200,
                "OK",
                "Record fetched successfully",
                data
        );
        return  ResponseEntity.ok(response);

    }

    @GetMapping("/api/person/search")
    public ResponseEntity<ApiResponse<List<Person>>> findByName(@RequestParam String name){
        List<Person> data = personService.findByName(name);

        ApiResponse<List<Person>> response = new ApiResponse<>(
                200,
                "OK",
                "Record fetched successfully",
                data
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/person")
    public ResponseEntity<ApiResponse<Person>> createPerson(@RequestBody Person person){
        Person data =  personService.createPerson(person);

        ApiResponse<Person> response = new ApiResponse<>(
                201,
                "CREATED",
                "Record created successfully.",
                data
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/person/{nik}")
    public ResponseEntity<ApiResponse<Person>> updatePerson(@PathVariable Long nik, @RequestBody Person person){
        Person data =  personService.updatePerson(nik, person);

        ApiResponse<Person> response = new ApiResponse<>(
                200,
                "OK",
                "Record updated successfully.",
                data
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/person/{nik}")
    public ResponseEntity<ApiResponse<Void>> deletePerson(@PathVariable Long nik){
        personService.deletePerson(nik);

        ApiResponse<Void> response = new ApiResponse<>(
                200,
                "OK",
                "Record deleted successfully.",
                null
        );
        return ResponseEntity.ok(response);
    }
}